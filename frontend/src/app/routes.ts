import Layout from '@/components/layout/Layout'
import Genealogy from '@/pages/Genealogy'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: 'login',
    Component: Login
  },
  {
    path: 'register',
    Component: Register
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: ':id',
        Component: Genealogy,
        loader: async ({ params }) => {
          return params.id
        }
      }
    ]
  }
])
