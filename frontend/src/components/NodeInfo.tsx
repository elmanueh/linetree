import { GenealogyNode } from '@/configs/types'
import { useUpdateNode } from '@/hooks/useUpdateNode'
import { useState } from 'react'
import './NodeInfo.css'

interface NodeInfoProps {
  node: any
  treeId: string
  callback: () => void
}

export default function NodeInfo({ node, treeId, callback }: NodeInfoProps) {
  const [formData, setFormData] = useState<GenealogyNode>({
    name: '',
    firstName: '',
    lastName: ''
  })
  const { updateNode } = useUpdateNode({ treeId })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleUpdateNode = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateNode(node.id, {
      ...formData
    })

    callback()
  }

  return (
    <form className="node-info" onSubmit={handleUpdateNode}>
      <label htmlFor="name">Nombre</label>
      <input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={handleInputChange}
        defaultValue={node?.name}
      />
      <label htmlFor="familyName">Apellidos</label>
      <input type="text" placeholder="Apellidos" onChange={handleInputChange} />
      <label htmlFor="birthDate">Fecha de Nacimiento</label>
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        onChange={handleInputChange}
      />
      <label htmlFor="gender">Género</label>
      <select id="gender" name="gender">
        <option value="Male">Hombre</option>
        <option value="Female">Mujer</option>
        <option value="Other">Otro</option>
      </select>

      <button>Actualizar Nodo</button>
    </form>
  )
}
