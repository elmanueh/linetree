import { UpdateNode } from '@/configs/api.types'
import { NodeGenderType } from '@/configs/constants'
import { NodeReducerType } from '@/configs/types'
import { useNode } from '@/hooks/useNode'
import { useEffect, useState } from 'react'

interface EditNodeModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (data: UpdateNode) => void
}

export default function EditNodeModal({
  isOpen,
  onClose,
  onEdit
}: EditNodeModalProps) {
  const { nodes } = useNode(NodeReducerType.BY_ID)
  const node = nodes[0]

  const initialFormData = {
    birthDate: node?.birthDate || '',
    familyName: node?.familyName || '',
    gender: node?.gender || '',
    givenName: node?.givenName || ''
  }
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (node) {
      setFormData({
        birthDate: node.birthDate
          ? new Date(node.birthDate).toISOString().split('T')[0]
          : '',
        familyName: '',
        gender: node?.gender || '',
        givenName: node?.givenName || ''
      })
    }
  }, [node])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const node: UpdateNode = {
      givenName: formData.givenName,
      familyName: formData.familyName,
      birthDate: new Date(formData.birthDate),
      gender: formData.gender
    }
    onEdit(node)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Editar persona</h2>

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                name="givenName"
                value={formData.givenName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Apellidos
              </label>
              <input
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
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
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
