import { useEffect, useRef, useState } from 'react'

export default function UserButton() {
  const [open, setOpen] = useState(false)
  const userName = 'Manuel Bernabe'
  const buttonRef = useRef<HTMLDivElement | null>(null)

  const handleLogout = () => {
    console.log('Cerrando sesión...')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [buttonRef])

  return (
    <div ref={buttonRef} className="relative">
      <button
        className="flex items-center gap-3 px-3 py-1 rounded-full hover:bg-gray-200 transition cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://i.pravatar.cc/32"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{userName}</span>
      </button>

      {open && (
        <div className="absolute mt-3 w-50 bg-white border border-gray-200 rounded-md">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
