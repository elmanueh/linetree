import Loading from '@/components/layout/Loading'
import AddNodeMenu from '@/components/menus/AddNodeMenu'
import MoreNodeMenu from '@/components/menus/MoreNodeMenu'
import EditNodeModal from '@/components/modals/EditNodeModal'
import { UpdateNode } from '@/configs/api.types'
import { NodeReducerType } from '@/configs/types'
import { useNode } from '@/hooks/useNode'
import { useState } from 'react'

interface NodeInfoProps {
  callbackUpdate: () => void
}

export default function NodeInfoHeader({ callbackUpdate }: NodeInfoProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const { nodes, loading, updateNode } = useNode(NodeReducerType.BY_ID)
  const node = nodes[0]

  const handleOnEdit = (data: UpdateNode) => {
    try {
      updateNode(node.id, data)
      callbackUpdate()
      setShowEditModal(false)
    } catch (error) {
      alert('Error updating node: ' + error)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-3 p-2">
        <img src="/male.svg" alt="Avatar" width={50} height={50} />
        <h3 className="text-md">{node.givenName}</h3>
      </div>
      <div className="flex space-x-8 justify-center">
        <AddNodeMenu callbackUpdate={callbackUpdate} />

        <button
          onClick={() => setShowEditModal(true)}
          className="cursor-pointer flex flex-col items-center"
        >
          <img src="/edit.svg" alt="Editar" width={25} height={25} />
          <span>Editar</span>
        </button>

        <EditNodeModal
          isOpen={showEditModal}
          onEdit={handleOnEdit}
          onClose={() => setShowEditModal(false)}
        />

        <MoreNodeMenu callbackUpdate={callbackUpdate} />
      </div>
    </div>
  )
}
