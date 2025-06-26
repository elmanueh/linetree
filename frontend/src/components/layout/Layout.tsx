import '@/app/index.css'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import PrivateRoute from '@/components/PrivateRoute'
import { NAV_ROUTES } from '@/configs/constants'
import { Outlet, useLocation } from 'react-router'

export default function Layout() {
  const location = useLocation()
  const isUuidRoute =
    /^\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      location.pathname
    )
  const hideHeader = [NAV_ROUTES.LOGIN, NAV_ROUTES.REGISTER]
  const hideFooter = [NAV_ROUTES.LOGIN, NAV_ROUTES.REGISTER]

  return (
    <PrivateRoute>
      <>
        {!hideHeader.includes(location.pathname) && <Nav />}
        <Outlet />
        {!hideFooter.includes(location.pathname) && !isUuidRoute && <Footer />}
      </>
    </PrivateRoute>
  )
}
