import GenealogyAside from '@/components/GenealogyAside'
import { GenealogyContext } from '@/context/GenealogyContext'
import { useGenealogy } from '@/hooks/useGenealogy'
import { drawNodes } from '@/utils/genealogy/drawNodes'
import { drawRelationships } from '@/utils/genealogy/drawRelationships'
import { setupZoom } from '@/utils/genealogy/setupZoom'
import generateLayoutTree from '@/utils/layout-tree'
import * as d3 from 'd3'
import { useCallback, useContext, useEffect, useRef } from 'react'

export default function Genealogy() {
  const { treeId, nodeId, handleSelectedNode } = useContext(GenealogyContext)
  const { handleGenealogy } = useGenealogy({ treeId })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSelectedNode2 = useCallback(
    (nodeId: string) => {
      handleSelectedNode(nodeId)
    },
    [handleSelectedNode]
  )

  const handleUpdateTree = useCallback(async () => {
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
  }, [handleGenealogy, handleSelectedNode2])

  useEffect(() => {
    handleUpdateTree()
  }, [handleUpdateTree])

  return (
    <div className="flex">
      {nodeId && <GenealogyAside callback={handleUpdateTree} />}
      <main className="flex-1 bg-gray-200">
        <svg ref={svgRef} className="w-full h-full block" />
      </main>
    </div>
  )
}
