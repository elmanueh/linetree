import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import { NodeReducerType } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useMenu } from '@/hooks/useMenu'
import { useNode } from '@/hooks/useNode'

export default function MoreNodeMenu() {
  const { handleGenealogy } = useGenealogy()
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const { nodes, deleteNode } = useNode(NodeReducerType.BY_ID)
  const node = nodes[0]

  const handleRemoveNode = async () => {
    try {
      await deleteNode(node.id)
      handleGenealogy()
      closeMenu()
    } catch (error) {
      alert('Error deleting node: ' + error)
    }
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        className="cursor-pointer flex flex-col items-center hover:bg-gray-200 transition rounded-2xl p-1.5 min-w-20"
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
