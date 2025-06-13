import Menu from '@/components/menus/config/Menu'
import MenuItem from '@/components/menus/config/MenuItem'
import { TreeReducerType, UUID } from '@/configs/types'
import { useMenu } from '@/hooks/useMenu'
import { useTree } from '@/hooks/useTree'
import { TreeService } from '@/services/tree.service'

interface MoreTreeMenuProps {
  id: UUID
  callbackDelete: (id: UUID) => void
}

export default function MoreTreeMenu({
  id,
  callbackDelete
}: MoreTreeMenuProps) {
  const { menuOpen, menuRef, toggleMenu, closeMenu } = useMenu()
  const { trees } = useTree(TreeReducerType.ALL)

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    closeMenu()

    callbackDelete(id)
  }

  const handleExportClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    closeMenu()

    if (trees?.length === 0) return
    const tree = trees.find((t) => t.id === id)
    const data = await TreeService.exportGedcom(id)
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `tree-${tree?.name || 'unknown'}.ged`
    a.click()

    URL.revokeObjectURL(url)
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
            label="Exportar a GEDCOM"
            onClick={(e: React.MouseEvent) => handleExportClick(e)}
          />
          <MenuItem
            label="Eliminar árbol"
            onClick={(e: React.MouseEvent) => handleDeleteClick(e)}
            type="danger"
          />
        </Menu>
      )}
    </div>
  )
}
