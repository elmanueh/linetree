import { API_URLS } from '@/configs/constants'
import { useState } from 'react'

interface UseRemoveNodeProps {
  treeId: string
}

export function useRemoveNode({ treeId }: UseRemoveNodeProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const removeNode = async (nodeId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URLS.NODE(treeId, nodeId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Error al eliminar nodo')
      return response
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { removeNode, loading, error }
}
