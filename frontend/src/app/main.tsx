import { router } from '@/app/routes'
import { GenealogyProvider } from '@/context/GenealogyProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <GenealogyProvider>
      <RouterProvider router={router} />
    </GenealogyProvider>
  </StrictMode>
)
