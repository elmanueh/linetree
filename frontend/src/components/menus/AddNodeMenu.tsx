import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import AddNodeModal from '@/components/modals/AddNodeModal'
import { CreateNode } from '@/configs/api.types'
import { NodeRelationType } from '@/configs/constants'
import { NodeReducerType } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useMenu } from '@/hooks/useMenu'
import { useNode } from '@/hooks/useNode'
import { useState } from 'react'

export default function AddNodeMenu() {
  const { handleGenealogy } = useGenealogy()
  const { nodes, loading, createNode } = useNode(NodeReducerType.BY_ID)
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const [showModal, setShowModal] = useState(false)
  const [selectedRelation, setSelectedRelation] =
    useState<NodeRelationType | null>(null)
  const node = nodes[0]

  const handleOpenModal = (relation: NodeRelationType) => {
    closeMenu()
    setSelectedRelation(relation)
    setShowModal(true)
  }

  const handleCreateNode = async (data: CreateNode) => {
    try {
      setShowModal(false)
      await createNode(data)
      handleGenealogy()
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
            label="Añadir padre"
            onClick={() => handleOpenModal(NodeRelationType.PARENT)}
          />
          <MenuItem
            label="Añadir cónyuge"
            onClick={() => handleOpenModal(NodeRelationType.SPOUSE)}
          />
          <MenuItem
            label="Añadir hijo"
            onClick={() => handleOpenModal(NodeRelationType.CHILDREN)}
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
