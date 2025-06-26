type MenuItemType = 'danger' | 'default'

const typeClasses: Record<MenuItemType, string> = {
  danger: 'text-red-600 hover:bg-red-100',
  default: 'text-gray-800 hover:bg-gray-200'
}

interface MenuItemProps {
  onClick: (e: React.MouseEvent) => void
  label: string
  type?: MenuItemType
}

export default function MenuItem({
  onClick,
  label,
  type = 'default'
}: MenuItemProps) {
  return (
    <button
      className={`w-full text-left px-3 py-2 ${typeClasses[type]} rounded cursor-pointer transition`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
