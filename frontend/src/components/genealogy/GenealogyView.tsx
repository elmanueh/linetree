import { GenealogyNode, GenealogyRelation, UUID } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { drawNodes } from '@/utils/genealogy/drawNodes'
import { drawRelationships } from '@/utils/genealogy/drawRelationships'
import { setupZoom } from '@/utils/genealogy/setupZoom'
import generateLayoutTree from '@/utils/layout-tree'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

export default function GenealogyView() {
  const { handleSelectedNode, handleGenealogy, genealogy } = useGenealogy()
  const svgRef = useRef<SVGSVGElement>(null)
  const [genealogyParsed, setGenealogyParsed] = useState<{
    rootNodes: GenealogyNode[]
    relations: GenealogyRelation[]
  }>({ rootNodes: [], relations: [] })

  const handleClickNode = (nodeId: UUID) => {
    handleSelectedNode(nodeId)
  }

  const handleClickBranch = (nodeId: UUID) => {
    const hasDescendant = (node: GenealogyNode, targetId: UUID) => {
      if (node.id === targetId) return true
      for (const child of node.children) {
        if (hasDescendant(child, targetId)) return true
      }
      return false
    }

    for (const rootNode of genealogyParsed.rootNodes) {
      if (hasDescendant(rootNode, nodeId)) {
        renderGenealogy(rootNode, genealogyParsed.relations, true)
        break
      }
    }
  }

  const handleUpdateTree = async () => {
    const { roots, relations } = await handleGenealogy()
    setGenealogyParsed({ rootNodes: roots, relations })
    renderGenealogy(roots[0], relations)
  }

  const renderGenealogy = (
    rootNode: GenealogyNode,
    relations: GenealogyRelation[],
    resetPosition = false
  ) => {
    const svg = d3.select(svgRef.current!)
    svg.selectAll('*').remove()
    svg.attr('width', '100%').attr('height', window.innerHeight)

    const nodes = generateLayoutTree(rootNode)

    const g = svg.append('g')
    drawRelationships(g, nodes, relations)
    drawNodes(g, nodes, handleClickNode, handleClickBranch)

    const zoom = setupZoom(svg, g)
    const zoomTransform = resetPosition
      ? d3.zoomIdentity
      : d3.zoomTransform(svg.node()!)
    svg.call(zoom.transform, zoomTransform)
  }

  useEffect(() => {
    handleUpdateTree()
  }, [genealogy])

  return (
    <svg
      ref={svgRef}
      className="w-full h-full block bg-gray-100 rounded-tl-2xl shadow"
    />
  )
}
