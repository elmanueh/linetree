import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import { useAuth } from '@/hooks/useAuth'
import { useMenu } from '@/hooks/useMenu'

export default function UserMenu() {
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const { user, loading, logout } = useAuth()

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    closeMenu()

    await logout()
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
        className="flex items-center gap-3 px-0 sm:px-3 py-1 rounded-xl hover:bg-gray-200 transition cursor-pointer"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Usuario"
      >
        <img
          src="https://i.pravatar.cc/32"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />

        <span className="text-sm font-medium hidden sm:inline-block">
          {loading ? 'Cargando...' : user?.firstName + ' ' + user?.lastName}
        </span>
      </button>

      {menuOpen && (
        <Menu position="right">
          <MenuItem
            label="Cerrar sesión"
            onClick={(e: React.MouseEvent) => handleLogout(e)}
          />
        </Menu>
      )}
    </div>
  )
}
