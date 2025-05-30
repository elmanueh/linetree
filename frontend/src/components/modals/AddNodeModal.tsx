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
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: NodeGenderType.MALE
}

export default function AddNodeModal({
  isOpen,
  onClose,
  onCreate,
  nodeId,
  relation
}: AddNodeModalProps) {
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const node: CreateNode = {
      nodeId,
      relation,
      nodeInfo: {
        name: formData.firstName + ' ' + formData.lastName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: new Date(formData.birthDate),
        deathDate: new Date(),
        gender: formData.gender
      }
    }
    onCreate(node)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Añadir persona</h2>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Apellidos
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                placeholder="Apellidos"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Género</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value={NodeGenderType.MALE}>Masculino</option>
              <option value={NodeGenderType.FEMALE}>Femenino</option>
            </select>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <button
              type="reset"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
