import { router } from '@/app/routes'
import { TreeProvider } from '@/context/TreeProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <TreeProvider>
      <RouterProvider router={router} />
    </TreeProvider>
  </StrictMode>
)
