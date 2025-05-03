import GenealogyAside from '@/components/GenealogyAside'
import { API_URLS } from '@/configs/constants'
import { parseGenealogy } from '@/utils/genealogy'
import { drawNodes, drawRelationships, setupZoom } from '@/utils/genealogy-d3'
import generateLayoutTree from '@/utils/layout-tree'
import * as d3 from 'd3'
import { NodeObject } from 'jsonld'
import { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'

export default function GenealogyTree() {
  const treeId = useLoaderData()
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<string>('')

  const fetchTreeData = async (): Promise<NodeObject> => {
    const response = await fetch(API_URLS.GENEALOGY(treeId))
    return response.json()
  }

  const handleUpdateTree = async () => {
    const jsonld = await fetchTreeData()
    const data = Array.isArray(jsonld['@graph']) ? jsonld['@graph'] : [jsonld]
    const { root, relations } = parseGenealogy(data)
    const linksTree = relations

    const layoutTree = generateLayoutTree(root)
    const svg = d3.select(svgRef.current!)

    svg.selectAll('*').remove()
    svg.attr('width', '100%').attr('height', '1000px')

    const g = svg.append('g')
    drawRelationships(g, layoutTree, linksTree)
    drawNodes(g, layoutTree, setSelectedNode)
    setupZoom(svg, g)
  }

  useEffect(() => {
    const initializeTree = async () => {
      const jsonld = await fetchTreeData()
      const data = Array.isArray(jsonld['@graph']) ? jsonld['@graph'] : [jsonld]
      const { root, relations } = parseGenealogy(data)
      const linksTree = relations

      const layoutTree = generateLayoutTree(root)
      const svg = d3.select(svgRef.current!)

      svg.selectAll('*').remove()
      svg.attr('width', '100%').attr('height', '1000px')

      const g = svg.append('g')
      drawRelationships(g, layoutTree, linksTree)
      drawNodes(g, layoutTree, setSelectedNode)
      setupZoom(svg, g)
    }

    initializeTree()
  })

  return (
    <div className="layout">
      <GenealogyAside
        node={selectedNode}
        treeId={treeId}
        callback={handleUpdateTree}
      />
      <div className="tree">
        <svg ref={svgRef} />
      </div>
    </div>
  )
}
