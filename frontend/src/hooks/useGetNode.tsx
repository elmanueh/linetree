import { API_URLS } from '@/configs/constants'
import { TreeContext } from '@/context/TreeContext'
import { useContext, useEffect, useState } from 'react'

export interface GenealogyNode {
  id: string
  name: string
  firstName: string
  lastName: string
  relation: string
}

export function useGetNode() {
  const { treeId, selectedNodeId, handleSelectedNode } = useContext(TreeContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [node, setNode] = useState<GenealogyNode | null>(null)

  useEffect(() => {
    if (!selectedNodeId) return
    setLoading(true)
    setError(null)

    fetch(API_URLS.NODE(treeId, selectedNodeId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setNode(data)
        handleSelectedNode(data.id)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [treeId, selectedNodeId])

  return { node, loading, error }
}
