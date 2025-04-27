import GenealogyTree from '@/components/GenealogyTree'
import Home from '@/pages/Home'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
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
