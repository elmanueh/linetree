import { API_URLS } from '@/configs/constants'
import { GenealogyNode } from '@/configs/types'
import { useState } from 'react'

interface UseUpdateNodeProps {
  treeId: string
}

export function useUpdateNode({ treeId }: UseUpdateNodeProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateNode = async (nodeId: string, nodeInfo: GenealogyNode) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URLS.NODE(treeId, nodeId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...nodeInfo
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

  return { updateNode, loading, error }
}
