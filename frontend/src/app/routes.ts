import Layout from '@/components/layout/Layout'
import GenealogyTree from '@/pages/GenealogyTree'
import Home from '@/pages/Home'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: ':id',
        Component: GenealogyTree,
        loader: async ({ params }) => {
          return params.id
        }
      }
    ]
  }
])
