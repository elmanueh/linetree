import { UUID } from '@/configs/types'
import { useEffect, useRef, useState } from 'react'

interface MoreTreeMenuProps {
  id: UUID
  callbackDelete: (id: UUID) => void
}

export default function MoreTreeMenu({
  id,
  callbackDelete
}: MoreTreeMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    callbackDelete(id)
    setMenuOpen(false)
  }

  const handleButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={handleButton}
        className="flex items-center justify-center cursor-pointer"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-label="Más opciones"
      >
        <img src="/kebab-menu.svg" alt="Más" width={20} height={20} />
      </button>

      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48 p-2 z-50">
          <button
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded cursor-pointer"
            onClick={handleDeleteClick}
          >
            Eliminar árbol
          </button>
        </div>
      )}
    </div>
  )
}
