import { UUID } from '@/configs/types'
import { GenealogyContext } from '@/context/GenealogyContext'
import { NodeObject } from 'jsonld'
import { useState } from 'react'

interface GenealogyProviderProps {
  children: React.ReactNode
}

export function GenealogyProvider({ children }: GenealogyProviderProps) {
  const pathTreeId = window.location.pathname.split('/')[1]
  const [treeId, setTreeId] = useState<UUID>(pathTreeId || '')
  const [nodeId, setNodeId] = useState<UUID>('')
  const [genealogy, setGenealogy] = useState<NodeObject[]>([])
  const [iterator, setIterator] = useState<number>(0)

  return (
    <GenealogyContext.Provider
      value={{
        treeId,
        setTreeId,
        nodeId,
        setNodeId,
        genealogy,
        setGenealogy,
        iterator,
        setIterator
      }}
    >
      {children}
    </GenealogyContext.Provider>
  )
}
