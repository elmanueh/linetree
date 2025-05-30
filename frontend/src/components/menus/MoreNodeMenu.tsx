import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import { NodeReducerType } from '@/configs/types'
import { useMenu } from '@/hooks/useMenu'
import { useNode } from '@/hooks/useNode'

interface MoreNodeMenuProps {
  callbackUpdate: () => void
}

export default function MoreNodeMenu({ callbackUpdate }: MoreNodeMenuProps) {
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const { nodes, deleteNode } = useNode(NodeReducerType.BY_ID)
  const node = nodes[0]

  const handleRemoveNode = async () => {
    try {
      await deleteNode(node.id)
      callbackUpdate()
      closeMenu()
    } catch (error) {
      alert('Error deleting node: ' + error)
    }
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className="cursor-pointer flex flex-col items-center"
        onClick={toggleMenu}
      >
        <img src="/kebab-menu.svg" alt="Más" width={25} height={25} />
        <span>Más</span>
      </button>
      {menuOpen && (
        <Menu position="right">
          <MenuItem
            label="Eliminar nodo"
            onClick={handleRemoveNode}
            type="danger"
          />
        </Menu>
      )}
    </div>
  )
}
