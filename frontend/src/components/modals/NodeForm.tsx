import SpouseSelector from '@/components/SpouseSelector'
import { NodeRelationType } from '@/configs/constants'
import { UUID } from '@/configs/types'

interface NodeFormProps {
  formData: {
    address?: string
    birthDate?: string
    birthPlace?: string
    deathDate?: string
    deathPlace?: string
    familyName?: string
    email?: string
    gender?: string
    givenName?: string
    nationality?: string
    spouseId?: UUID
    telephone?: string
  }
  errors: {
    givenName?: string
    gender?: string
    spouseId?: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSpouseChange?: (spouseId: UUID) => void
  relation?: NodeRelationType
  onReset: () => void
  onSubmit: (e: React.FormEvent) => void
  submitLabel: string
}

export default function NodeForm({
  formData,
  errors,
  onChange,
  onSpouseChange,
  relation,
  onReset,
  onSubmit,
  submitLabel
}: NodeFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Columna izquierda */}
      <div className="space-y-8">
        {/* Información Personal */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Información Personal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                name="givenName"
                value={formData.givenName}
                onChange={onChange}
                placeholder="Ej. Juan"
                className={`w-full rounded-lg border px-3 py-2 focus:ring-2 bg-gray-50 focus:outline-none ${
                  errors.givenName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-400 focus:ring-green-600'
                }`}
              />
              {errors.givenName && (
                <p className="text-sm text-red-500 mt-1">{errors.givenName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Apellidos
              </label>
              <input
                name="familyName"
                value={formData.familyName}
                onChange={onChange}
                placeholder="Ej. Pérez Gómez"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Género <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={onChange}
                className={`w-full rounded-lg border px-2 py-2 focus:ring-2 bg-gray-50 focus:outline-none ${
                  errors.gender
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-400 focus:ring-green-600'
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
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Nacionalidad
              </label>
              <input
                name="nationality"
                value={formData.nationality}
                onChange={onChange}
                placeholder="Ej. Española"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={onChange}
                placeholder="+34 600 000 000"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="correo@ejemplo.com"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Dirección
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Ej. Calle Mayor 1, Murcia"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Fechas y Lugares
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Lugar de nacimiento
              </label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={onChange}
                placeholder="Ej. Valencia"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Fecha de fallecimiento
              </label>
              <input
                type="date"
                name="deathDate"
                value={formData.deathDate}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Lugar de fallecimiento
              </label>
              <input
                type="text"
                name="deathPlace"
                value={formData.deathPlace}
                onChange={onChange}
                placeholder="Ej. Madrid"
                className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none bg-gray-50"
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
            callbackChange={onSpouseChange!}
          />
          {errors.spouseId && (
            <p className="text-sm text-red-500 mt-1">{errors.spouseId}</p>
          )}
        </div>
      )}

      {/* Botones */}
      <div className="col-span-1 md:col-span-2 flex justify-end mt-6 gap-4">
        <button
          type="reset"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition font-medium cursor-pointer"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
