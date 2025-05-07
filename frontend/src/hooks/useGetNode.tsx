import { API_URLS } from '@/configs/constants'
import { TreeContext } from '@/context/TreeContext'
import { useContext, useEffect, useState } from 'react'

export interface NodeDto {
  id: string
  name: string
  gender: string
  birthDate: string
  deathDate: string
}

export function useGetNode() {
  const { treeId, selectedNodeId, handleSelectedNode } = useContext(TreeContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [node, setNode] = useState<NodeDto>()

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
        const node: NodeDto = {
          id: data.id,
          name: data.name,
          gender: data?.gender,
          birthDate: data?.birthDate,
          deathDate: data?.deathDate
        }

        setNode(node)
        handleSelectedNode(node.id)
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
