import { GenealogyContextType } from '@/context/GenealogyProvider'
import { createContext } from 'react'

export const GenealogyContext = createContext<GenealogyContextType>(undefined!)
