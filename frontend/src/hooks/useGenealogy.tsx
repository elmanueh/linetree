import { UUID } from '@/configs/types'
import { GenealogyContext } from '@/context/GenealogyContext'
import { NodeService } from '@/services/node.service'
import { parseGenealogy } from '@/utils/genealogy'
import { useContext } from 'react'

export function useGenealogy() {
  const { treeId, setTreeId, nodeId, setNodeId, genealogy, setGenealogy } =
    useContext(GenealogyContext)

  const handleSelectedTree = (treeId: UUID) => {
    setTreeId(treeId)
    setNodeId('')
    setGenealogy([])
  }

  const handleSelectedNode = (nodeId: UUID) => {
    setNodeId(nodeId)
  }

  const handleGenealogy = async () => {
    try {
      const jsonld = await NodeService.getGenealogy(treeId)
      const data = Array.isArray(jsonld['@graph']) ? jsonld['@graph'] : [jsonld]
      if (JSON.stringify(data) !== JSON.stringify(genealogy)) setGenealogy(data)

      const { root, relations } = parseGenealogy(data)

      return { root, relations }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    treeId,
    nodeId,
    genealogy,
    handleSelectedTree,
    handleSelectedNode,
    handleGenealogy
  }
}
