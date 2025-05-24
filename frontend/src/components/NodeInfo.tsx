import { UpdateNode } from '@/configs/api.types'
import { NodeReducerType } from '@/configs/types'
import { GenealogyContext } from '@/context/GenealogyContext'
import { useNode } from '@/hooks/useNode'
import { useContext, useEffect, useState } from 'react'

interface NodeInfoProps {
  callbackUpdate: (node: UpdateNode) => void
}

const initialFormData = {
  name: ''
}

export default function NodeInfo({ callbackUpdate }: NodeInfoProps) {
  const { nodeId } = useContext(GenealogyContext)
  const { nodes, loading } = useNode(NodeReducerType.BY_ID)
  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleUpdateNode = async (e: React.FormEvent) => {
    e.preventDefault()

    const node: UpdateNode = {
      name: formData?.name
    }

    callbackUpdate(node)
  }

  useEffect(() => {
    const node = nodes[0]
    if (node) {
      setFormData((prevData) => ({
        ...prevData,
        name: node.name || initialFormData.name
      }))
    }
  }, [nodes, nodeId])

  if (loading) return

  return (
    <form
      onSubmit={handleUpdateNode}
      className="w-full rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Editar Información del Nodo</h2>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={handleInputChange}
          value={formData.name}
          autoComplete="off"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="familyName" className="text-sm font-medium">
          Apellidos
        </label>
        <input
          id="familyName"
          name="familyName"
          type="text"
          placeholder="Apellidos"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="text-sm font-medium">
          Fecha de Nacimiento
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="gender" className="text-sm font-medium">
          Género
        </label>
        <select
          id="gender"
          name="gender"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Selecciona una opción</option>
          <option value="Male">Hombre</option>
          <option value="Female">Mujer</option>
          <option value="Other">Otro</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 cursor-pointer px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Actualizar Nodo
        </button>
      </div>
    </form>
  )
}
