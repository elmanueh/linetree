import GenealogyAside from '@/components/GenealogyAside'
import { API_URLS } from '@/configs/constants'
import { drawNodes, drawRelationships, setupZoom } from '@/utils/genealogy-d3'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import { getGenealogyNodes, getGenealogyRelations } from 'src/utils/genealogy'
import generateLayoutTree from 'src/utils/layout-tree'

export default function GenealogyTree() {
  const treeId = useLoaderData()
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<string>('')

  const fetchTreeData = async () => {
    const response = await fetch(API_URLS.GENEALOGY(treeId))
    return response.json()
  }

  const handleUpdateTree = async () => {
    const data = await fetchTreeData()
    const nodes = getGenealogyNodes(data)
    const linksTree = getGenealogyRelations()

    const layoutTree = generateLayoutTree(nodes)
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
      const jsonLdData = await fetchTreeData()
      const nodes = getGenealogyNodes(jsonLdData)
      const linksTree = getGenealogyRelations()

      const layoutTree = generateLayoutTree(nodes)
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
