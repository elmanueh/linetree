import { API_URLS } from '@/configs/constants'
import { GenealogyNode } from '@/configs/types'
import { useState } from 'react'

interface UseAddNodeProps {
  treeId: string
}

export function useAddNode({ treeId }: UseAddNodeProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addNode = async (
    nodeId: string,
    relation: string,
    nodeInfo: GenealogyNode
  ) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URLS.NODES(treeId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nodeId,
          relation,
          nodeInfo
        })
      })

      if (!response.ok) throw new Error('Error al añadir nodo')
      return response
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { addNode, loading, error }
}
