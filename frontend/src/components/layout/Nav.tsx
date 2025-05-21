import UserButton from '@/components/layout/UserButton'
import { NAV_ROUTES } from '@/configs/constants'
import { Link } from 'react-router'

export default function Nav() {
  return (
    <nav className="bg-gray-300 py-4 sticky top-0 text-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to={NAV_ROUTES.HOME} className="flex items-center gap-2">
          <img src="tree.svg" alt="App Logo" className="w-9 h-9" />
          <span className="text-lg font-bold">Genealogy</span>
        </Link>

        <Link to={NAV_ROUTES.HOME} className="font-medium hover:text-green-700">
          Mis árboles
        </Link>

        <UserButton />
      </div>
    </nav>
  )
}
