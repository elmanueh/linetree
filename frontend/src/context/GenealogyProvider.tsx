import { UUID } from '@/configs/types'
import { GenealogyContext } from '@/context/GenealogyContext'
import { useState } from 'react'

interface GenealogyProviderProps {
  children: React.ReactNode
}

export interface GenealogyContextType {
  treeId: UUID
  handleSelectedTree: (treeId: UUID) => void
  nodeId: UUID
  handleSelectedNode: (nodeId: UUID) => void
}

export function GenealogyProvider({ children }: GenealogyProviderProps) {
  const pathTreeId = window.location.pathname.split('/')[1]
  const [treeId, setTreeId] = useState(pathTreeId || '')
  const [nodeId, setNodeId] = useState('')

  const handleSelectedTree = (treeId: UUID) => {
    setTreeId(treeId)
    setNodeId('')
  }

  const handleSelectedNode = (nodeId: UUID) => {
    setNodeId(nodeId)
  }

  return (
    <GenealogyContext.Provider
      value={{ treeId, handleSelectedTree, nodeId, handleSelectedNode }}
    >
      {children}
    </GenealogyContext.Provider>
  )
}
