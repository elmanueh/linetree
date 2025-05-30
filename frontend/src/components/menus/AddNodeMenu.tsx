import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import AddNodeModal from '@/components/modals/AddNodeModal'
import { CreateNode } from '@/configs/api.types'
import { NodeRelationType } from '@/configs/constants'
import { NodeReducerType } from '@/configs/types'
import { useMenu } from '@/hooks/useMenu'
import { useNode } from '@/hooks/useNode'
import { useState } from 'react'

interface AddNodeMenuProps {
  callbackUpdate: () => void
}

export default function AddNodeMenu({ callbackUpdate }: AddNodeMenuProps) {
  const { nodes, loading, createNode } = useNode(NodeReducerType.BY_ID)
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const [showModal, setShowModal] = useState(false)
  const [selectedRelation, setSelectedRelation] =
    useState<NodeRelationType | null>(null)
  const node = nodes[0]

  const handleOpenModal = (relation: NodeRelationType) => {
    setSelectedRelation(relation)
    setShowModal(true)
  }

  const handleCreateNode = async (data: CreateNode) => {
    try {
      setShowModal(false)
      await createNode(data)
      callbackUpdate()
      closeMenu()
    } catch (error) {
      alert('Error creating node: ' + error)
    }
  }

  if (loading) return null

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className="cursor-pointer flex flex-col items-center"
        onClick={toggleMenu}
      >
        <img src="/person-add.svg" alt="Añadir" width={25} height={25} />
        <span>Agregar</span>
      </button>
      {menuOpen && (
        <Menu position="left">
          <MenuItem
            label="Añadir hijo"
            onClick={() => handleOpenModal(NodeRelationType.CHILDREN)}
          />
          <MenuItem
            label="Añadir pareja"
            onClick={() => handleOpenModal(NodeRelationType.SPOUSE)}
          />
        </Menu>
      )}
      <AddNodeModal
        isOpen={showModal}
        onCreate={handleCreateNode}
        onClose={() => setShowModal(false)}
        nodeId={node.id}
        relation={selectedRelation!}
      />
    </div>
  )
}
