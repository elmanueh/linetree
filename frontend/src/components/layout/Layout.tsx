import '@/app/index.css'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import PrivateRoute from '@/components/PrivateRoute'
import { NAV_ROUTES } from '@/configs/constants'
import { Outlet, useLocation } from 'react-router'

export default function Layout() {
  const location = useLocation()
  const excludeLayoutRoutes = [NAV_ROUTES.LOGIN, NAV_ROUTES.REGISTER]

  return (
    <PrivateRoute>
      {excludeLayoutRoutes.includes(location.pathname) ? (
        <Outlet />
      ) : (
        <>
          <Nav />
          <Outlet />
          <Footer />
        </>
      )}
    </PrivateRoute>
  )
}
