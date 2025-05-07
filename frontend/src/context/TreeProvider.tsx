import { TreeContext } from '@/context/TreeContext'
import { useState } from 'react'

interface TreeProviderProps {
  children: React.ReactNode
}

export interface TreeContextType {
  treeId: string
  handleSelectedTree: (treeId: string) => void
  selectedNodeId: string
  handleSelectedNode: (nodeId: string) => void
}

export function TreeProvider({ children }: TreeProviderProps) {
  const pathTreeId = window.location.pathname.split('/')[1]
  const [treeId, setTreeId] = useState<string>(pathTreeId || '')
  const [selectedNodeId, setSelectedNodeId] = useState<string>('')

  const handleSelectedTree = (treeId: string) => {
    setTreeId(treeId)
  }

  const handleSelectedNode = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }

  return (
    <TreeContext.Provider
      value={{ treeId, handleSelectedTree, selectedNodeId, handleSelectedNode }}
    >
      {children}
    </TreeContext.Provider>
  )
}
