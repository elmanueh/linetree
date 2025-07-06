import AddNodeMenu from '@/components/menus/AddNodeMenu'
import MoreNodeMenu from '@/components/menus/MoreNodeMenu'
import EditNodeModal from '@/components/modals/EditNodeModal'
import { Node, UpdateNode } from '@/configs/api.types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useState } from 'react'

interface NodeInfoHeaderProps {
  node: Node
  callbackUpdate: (data: UpdateNode) => void
}

export default function NodeInfoHeader({
  node,
  callbackUpdate
}: NodeInfoHeaderProps) {
  const { handleSelectedNode } = useGenealogy()
  const [showEditModal, setShowEditModal] = useState(false)

  const handleOnEdit = async (data: UpdateNode) => {
    setShowEditModal(false)
    if (Object.keys(data).length !== 0) {
      callbackUpdate(data)
    }
  }

  return (
    <div className="space-y-3 mb-6 bg-gray-100 border border-gray-100 shadow-sm rounded-2xl">
      <div className="flex gap-3 px-3 pt-4 justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img src="/male.svg" alt="Avatar" width={50} height={50} />
          <h3 className="text-md font-semibold truncate">
            {node.givenName} {node.familyName ?? ''}
          </h3>
        </div>
        <div>
          <img
            src="/close.svg"
            alt="Cerrar"
            width={20}
            height={20}
            className="cursor-pointer "
            onClick={() => handleSelectedNode('')}
          />
        </div>
      </div>
      <div className="flex space-x-1 justify-center p-3">
        <AddNodeMenu />

        <button
          onClick={() => setShowEditModal(true)}
          className="cursor-pointer flex flex-col items-center hover:bg-gray-200 transition rounded-2xl p-1.5 min-w-20"
        >
          <img src="/edit.svg" alt="Editar" width={25} height={25} />
          <span>Editar</span>
        </button>

        <EditNodeModal
          isOpen={showEditModal}
          onEdit={handleOnEdit}
          onClose={() => setShowEditModal(false)}
        />

        <MoreNodeMenu />
      </div>
    </div>
  )
}
