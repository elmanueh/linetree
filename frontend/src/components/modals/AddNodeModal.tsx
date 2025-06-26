import NodeForm from '@/components/modals/NodeForm'
import { CreateNode } from '@/configs/api.types'
import { NodeGenderType, NodeRelationType } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { useState } from 'react'

const initialFormData = {
  address: undefined as string | undefined,
  birthDate: undefined as string | undefined,
  birthPlace: undefined as string | undefined,
  deathDate: undefined as string | undefined,
  deathPlace: undefined as string | undefined,
  familyName: undefined as string | undefined,
  email: undefined as string | undefined,
  gender: undefined as string | undefined,
  givenName: undefined as string | undefined,
  nationality: undefined as string | undefined,
  spouseId: undefined as UUID | undefined,
  telephone: undefined as string | undefined
}

const relationMap = {
  [NodeRelationType.PARENT]: 'padre',
  [NodeRelationType.CHILDREN]: 'hijo',
  [NodeRelationType.SPOUSE]: 'cónyuge'
}

interface AddNodeModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: CreateNode) => void
  nodeId: UUID
  relation: NodeRelationType
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

  const handleSpouseChange = (spouseId: UUID) => {
    setFormData({ ...formData, spouseId })
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.givenName?.trim())
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
        givenName: formData.givenName as string,
        gender: formData.gender as NodeGenderType
      }
    }

    if (formData.address) node.nodeInfo.address = formData.address
    if (formData.birthDate)
      node.nodeInfo.birthDate = new Date(formData.birthDate).toISOString()
    if (formData.deathDate)
      node.nodeInfo.deathDate = new Date(formData.deathDate).toISOString()
    if (formData.familyName) node.nodeInfo.familyName = formData.familyName
    if (formData.birthPlace) node.nodeInfo.birthPlace = formData.birthPlace
    if (formData.deathPlace) node.nodeInfo.deathPlace = formData.deathPlace
    if (formData.nationality) node.nodeInfo.nationality = formData.nationality
    if (formData.telephone) node.nodeInfo.telephone = formData.telephone
    if (formData.email) node.nodeInfo.email = formData.email

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
      <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-5">Crear persona</h2>
        <NodeForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSpouseChange={handleSpouseChange}
          relation={relation}
          onReset={handleReset}
          onSubmit={handleSubmit}
          submitLabel={'Añadir ' + relationMap[relation]}
        />
      </div>
    </div>
  )
}
