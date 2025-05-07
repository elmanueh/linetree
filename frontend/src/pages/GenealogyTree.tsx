import GenealogyAside from '@/components/GenealogyAside'
import { TreeContext } from '@/context/TreeContext'
import { useGenealogy } from '@/hooks/useGenealogy'
import { drawNodes, drawRelationships, setupZoom } from '@/utils/genealogy-d3'
import generateLayoutTree from '@/utils/layout-tree'
import * as d3 from 'd3'
import { useContext, useEffect, useRef } from 'react'

export default function GenealogyTree() {
  const { treeId, handleSelectedNode } = useContext(TreeContext)
  const { handleGenealogy } = useGenealogy({ treeId })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSelectedNode2 = (nodeId: string) => {
    handleSelectedNode(nodeId)
  }

  const handleUpdateTree = async () => {
    const svg = d3.select(svgRef.current!)
    const zoomTransform = d3.zoomTransform(svg.node()!)

    const { root, relations } = await handleGenealogy()
    const layoutTree = generateLayoutTree(root)

    svg.selectAll('*').remove()
    svg.attr('width', '100%').attr('height', '1000px')

    const g = svg.append('g')
    drawRelationships(g, layoutTree, relations)
    drawNodes(g, layoutTree, handleSelectedNode2)

    const zoom = setupZoom(svg, g)
    svg.call(zoom.transform, zoomTransform)
  }

  useEffect(() => {
    handleUpdateTree()
  }, [])

  return (
    <div className="layout">
      <GenealogyAside callback={handleUpdateTree} />
      <div className="tree">
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
