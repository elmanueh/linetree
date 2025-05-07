import { TreeContextType } from '@/context/TreeProvider'
import { createContext } from 'react'

export const TreeContext = createContext<TreeContextType>(undefined!)
