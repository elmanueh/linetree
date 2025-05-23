import { GenealogyContext } from '@/context/GenealogyContext'
import { useState } from 'react'

interface GenealogyProviderProps {
  children: React.ReactNode
}

export interface GenealogyContextType {
  treeId: string
  handleSelectedTree: (treeId: string) => void
  nodeId: string
  handleSelectedNode: (nodeId: string) => void
}

export function GenealogyProvider({ children }: GenealogyProviderProps) {
  const pathTreeId = window.location.pathname.split('/')[1]
  const [treeId, setTreeId] = useState<string>(pathTreeId || '')
  const [nodeId, setNodeId] = useState<string>('')

  const handleSelectedTree = (treeId: string) => {
    setTreeId(treeId)
  }

  const handleSelectedNode = (nodeId: string) => {
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
