import { NAV_ROUTES } from '@/configs/constants'
import { TreeContext } from '@/context/TreeContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

interface TreeCardProps {
  id: string
  name: string
  nodeCount: number
  callbackDelete: (id: string) => void
}

export default function TreeCard({
  id,
  name,
  nodeCount,
  callbackDelete
}: TreeCardProps) {
  const { handleSelectedTree } = useContext(TreeContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [buttonRef])

  return (
    <div className="relative border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-200">
      <Link
        to={NAV_ROUTES.TREE(id)}
        onClick={() => handleSelectedTree(id)}
        className="block"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-500">
              {nodeCount} persona{nodeCount !== 1 && 's'}
            </p>
          </div>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer px-2"
            aria-label="Abrir menú"
          >
            ⋮
          </button>
        </div>
      </Link>

      {menuOpen && (
        <div
          ref={buttonRef}
          className="absolute top-4 right-4 bg-white border border-gray-300 rounded-md shadow-lg w-48 p-2"
        >
          <button
            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded cursor-pointer"
            onClick={() => callbackDelete(id)}
          >
            Eliminar árbol
          </button>
        </div>
      )}
    </div>
  )
}
