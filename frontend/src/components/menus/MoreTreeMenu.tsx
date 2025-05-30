import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import { UUID } from '@/configs/types'
import { useMenu } from '@/hooks/useMenu'

interface MoreTreeMenuProps {
  id: UUID
  callbackDelete: (id: UUID) => void
}

export default function MoreTreeMenu({
  id,
  callbackDelete
}: MoreTreeMenuProps) {
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()

  const handleDeleteClick = () => {
    callbackDelete(id)
    closeMenu()
  }

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault()
    e.stopPropagation()
    toggleMenu()
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={handleButtonClick}
        className="flex items-center justify-center cursor-pointer"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Más opciones"
      >
        <img src="/kebab-menu.svg" alt="Más" width={20} height={20} />
      </button>

      {menuOpen && (
        <Menu position="right">
          <MenuItem
            label="Eliminar árbol"
            onClick={handleDeleteClick}
            type="danger"
          />
        </Menu>
      )}
    </div>
  )
}
