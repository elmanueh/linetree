type MenuPosition = 'left' | 'right'

const positionClasses: Record<MenuPosition, string> = {
  left: 'left-0',
  right: 'right-0'
}

interface MenuProps {
  position: MenuPosition
  children: React.ReactNode
}

export default function Menu({ position, children }: MenuProps) {
  return (
    <div
      className={`absolute top-full ${positionClasses[position]} mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-lg w-48 p-2 z-50`}
    >
      {children}
    </div>
  )
}
