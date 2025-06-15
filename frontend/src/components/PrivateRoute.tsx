import { NAV_ROUTES } from '@/configs/constants'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

interface PrivateRouteProps {
  children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()
  const excludeRoutes = [NAV_ROUTES.LOGIN, NAV_ROUTES.REGISTER]

  if (loading) return null
  if (
    !user &&
    !excludeRoutes.includes(location.pathname) &&
    location.pathname !== NAV_ROUTES.OVERVIEW
  ) {
    return <Navigate to={NAV_ROUTES.OVERVIEW} />
  }
  if (user && excludeRoutes.includes(location.pathname)) {
    return <Navigate to={NAV_ROUTES.HOME} />
  }

  return children
}
