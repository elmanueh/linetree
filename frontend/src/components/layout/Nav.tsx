import UserMenu from '@/components/menus/UserMenu'
import { NAV_ROUTES } from '@/configs/constants'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router'

export default function Nav() {
  const { user, loading } = useAuth()
  return (
    <nav className="bg-gray-300 py-4 sticky top-0 text-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to={NAV_ROUTES.OVERVIEW} className="flex items-center gap-2">
          <img src="tree.svg" alt="App Logo" className="w-9 h-9" />
          <span className="text-lg font-bold">LineTree</span>
        </Link>

        {!loading && user && (
          <>
            <Link
              to={NAV_ROUTES.HOME}
              className="font-medium p-2 rounded-xl transition hover:bg-gray-200"
            >
              Mis árboles
            </Link>
            <UserMenu />
          </>
        )}
        {!loading && !user && (
          <Link
            to={NAV_ROUTES.LOGIN}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  )
}
