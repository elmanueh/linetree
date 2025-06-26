import { UUID } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { drawNodes } from '@/utils/genealogy/drawNodes'
import { drawRelationships } from '@/utils/genealogy/drawRelationships'
import { setupZoom } from '@/utils/genealogy/setupZoom'
import generateLayoutTree from '@/utils/layout-tree'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export default function GenealogyView() {
  const { handleSelectedNode, handleGenealogy, genealogy } = useGenealogy()
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSelectedNode2 = (nodeId: UUID) => {
    handleSelectedNode(nodeId)
  }

  const handleUpdateTree = async () => {
    const svg = d3.select(svgRef.current!)
    const zoomTransform = d3.zoomTransform(svg.node()!)

    const { root, relations } = await handleGenealogy()
    const layoutTree = generateLayoutTree(root)

    svg.selectAll('*').remove()
    svg.attr('width', '100%').attr('height', window.innerHeight)

    const g = svg.append('g')
    drawRelationships(g, layoutTree, relations)
    drawNodes(g, layoutTree, handleSelectedNode2)

    const zoom = setupZoom(svg, g)
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
