import Layout from '@/components/layout/Layout'
import Genealogy from '@/pages/Genealogy'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Overview from '@/pages/Overview'
import Register from '@/pages/Register'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'home', Component: Home },
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
