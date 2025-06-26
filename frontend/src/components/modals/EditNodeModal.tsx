import NodeForm from '@/components/modals/NodeForm'
import { UpdateNode } from '@/configs/api.types'
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
    birthDate: node?.birthDate
      ? new Date(node.birthDate).toISOString().split('T')[0]
      : undefined,
    birthPlace: node?.birthPlace || undefined,
    deathDate: node?.deathDate
      ? new Date(node.deathDate).toISOString().split('T')[0]
      : undefined,
    deathPlace: node?.deathPlace || undefined,
    familyName: node?.familyName || undefined,
    email: node?.email || undefined,
    gender: node?.gender || undefined,
    givenName: node?.givenName || undefined,
    nationality: node?.nationality || undefined,
    telephone: node?.telephone || undefined
  }

  const [originalData, setOriginalData] = useState(initialFormData)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<{ givenName?: string; gender?: string }>(
    {}
  )

  useEffect(() => {
    if (node) {
      const loadedData = {
        birthDate: node.birthDate
          ? new Date(node.birthDate).toISOString().split('T')[0]
          : undefined,
        birthPlace: node.birthPlace || undefined,
        deathDate: node.deathDate
          ? new Date(node.deathDate).toISOString().split('T')[0]
          : undefined,
        deathPlace: node.deathPlace || undefined,
        familyName: node.familyName || undefined,
        email: node.email || undefined,
        gender: node.gender || undefined,
        givenName: node.givenName || undefined,
        nationality: node.nationality || undefined,
        telephone: node.telephone || undefined
      }
      setFormData(loadedData)
      setOriginalData(loadedData)
    }
  }, [node])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.givenName?.trim())
      newErrors.givenName = 'El nombre es obligatorio'
    if (!formData.gender) newErrors.gender = 'El género es obligatorio'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const updatedNode: UpdateNode = {}

    Object.entries(formData).forEach(([key, value]) => {
      const originalValue = originalData[key as keyof typeof originalData]

      if (
        (key === 'birthDate' || key === 'deathDate') &&
        originalValue !== value
      ) {
        const date = value ? new Date(value) : undefined
        updatedNode[key as keyof UpdateNode] = date
      } else if (originalValue !== value) {
        updatedNode[key as keyof UpdateNode] = value
      }
    })

    onEdit(updatedNode)
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
        <h2 className="text-xl font-semibold mb-5">Editar persona</h2>
        <NodeForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onReset={handleReset}
          onSubmit={handleSubmit}
          submitLabel="Actualizar"
        />
      </div>
    </div>
  )
}
