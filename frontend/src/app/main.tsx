import { router } from '@/app/routes'
import { AuthProvider } from '@/context/AuthProvider'
import { GenealogyProvider } from '@/context/GenealogyProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <GenealogyProvider>
        <RouterProvider router={router} />
      </GenealogyProvider>
    </AuthProvider>
  </StrictMode>
)
