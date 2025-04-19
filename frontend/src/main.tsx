import GenealogyTree from '@components/GenealogyTree'
import Nav from '@components/Nav'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
    <GenealogyTree />
  </StrictMode>
)
