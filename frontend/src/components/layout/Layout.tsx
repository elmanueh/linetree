import '@/app/index.css'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
