import SpouseSelector from '@/components/SpouseSelector'
import { CreateNode } from '@/configs/api.types'
import { NodeGenderType, NodeRelationType } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { useState } from 'react'

interface AddNodeModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: CreateNode) => void
  nodeId: UUID
  relation: NodeRelationType
}

const initialFormData = {
  birthDate: '',
  birthPlace: '',
  deathDate: '',
  deathPlace: '',
  familyName: '',
  email: '',
  gender: '',
  givenName: '',
  nationality: '',
  spouseId: undefined as UUID | undefined,
  telephone: ''
}

export default function AddNodeModal({
  isOpen,
  onClose,
  onCreate,
  nodeId,
  relation
}: AddNodeModalProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<{
    givenName?: string
    gender?: string
    spouseId?: string
  }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const callbackChange = (spouseId: UUID) => {
    setFormData({ ...formData, spouseId })
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.givenName.trim())
      newErrors.givenName = 'El nombre es obligatorio'
    if (!formData.gender) newErrors.gender = 'El género es obligatorio'
    if (relation === NodeRelationType.CHILDREN && !formData.spouseId)
      newErrors.spouseId = 'El cónyuge es obligatorio'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const node: CreateNode = {
      nodeId,
      spouseId: formData.spouseId,
      relation,
      nodeInfo: {
        birthDate: formData.birthDate
          ? new Date(formData.birthDate).toISOString()
          : undefined,
        deathDate: formData.deathDate
          ? new Date(formData.deathDate).toISOString()
          : undefined,
        familyName: formData.familyName,
        givenName: formData.givenName,
        gender: formData.gender as NodeGenderType,
        birthPlace: formData.birthPlace,
        deathPlace: formData.deathPlace,
        nationality: formData.nationality,
        telephone: formData.telephone,
        email: formData.email
      }
    }

    onCreate(node)
    handleReset()
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-5">Añadir persona</h2>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Identidad */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Identidad
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleChange}
                    placeholder="Ej. Juan"
                    className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      errors.givenName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {errors.givenName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.givenName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                  </label>
                  <input
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    placeholder="Ej. Pérez Gómez"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Género <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
                      errors.gender
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  >
                    <option value="">Selecciona</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nacionalidad
                  </label>
                  <input
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Ej. Española"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contacto
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Datos vitales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lugar de nacimiento
                  </label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="Ej. Valencia"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de fallecimiento
                  </label>
                  <input
                    type="date"
                    name="deathDate"
                    value={formData.deathDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lugar de fallecimiento
                  </label>
                  <input
                    type="text"
                    name="deathPlace"
                    value={formData.deathPlace}
                    onChange={handleChange}
                    placeholder="Ej. Madrid"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Selector de cónyuge */}
          {relation === NodeRelationType.CHILDREN && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <SpouseSelector
                formData={formData}
                callbackChange={callbackChange}
              />
            </div>
          )}

          {/* Botones */}
          <div className="col-span-1 md:col-span-2 flex justify-end mt-6 gap-4">
            <button
              type="reset"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium cursor-pointer"
            >
              Crear persona
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
