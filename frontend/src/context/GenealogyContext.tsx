import { UUID } from '@/configs/types'
import { NodeObject } from 'jsonld'
import { createContext } from 'react'

interface GenealogyContextType {
  treeId: UUID
  setTreeId: (treeId: UUID) => void
  nodeId: UUID
  setNodeId: (nodeId: UUID) => void
  genealogy: NodeObject[]
  setGenealogy: (genealogy: NodeObject[]) => void
  iterator: number
  setIterator: React.Dispatch<React.SetStateAction<number>>
}

export const GenealogyContext = createContext<GenealogyContextType>(undefined!)
