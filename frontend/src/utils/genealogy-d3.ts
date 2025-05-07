import { NODE_HEIGHT, NODE_WIDTH } from '@/configs/constants'
import { Node, Relationship } from '@/configs/types'
import * as d3 from 'd3'

export function setupZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>
) {
  const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
    g.attr('transform', event.transform)
  })

  svg.call(zoom)
  return zoom
}

export function drawNodes(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  layoutTree: Node[],
  setSelectedNode: (id: string) => void
) {
  const node = g
    .selectAll<SVGGElement, Node>('.node')
    .data(layoutTree)
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .on('click', (_event, d) => setSelectedNode(d.id))

  node
    .append('rect')
    .attr('width', NODE_WIDTH)
    .attr('height', NODE_HEIGHT)
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('fill', '#fff')
    .attr('stroke', '#17b4ce')
    .attr('stroke-width', 2)

  node
    .append('image')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 40)
    .attr('height', 40)
    .attr(
      'href',
      'https://cf.mhcache.com/FP/Assets/Images/Silhouette/SVG/silhouette-man.svg'
    )

  node
    .append('text')
    .attr('x', 60)
    .attr('y', 35)
    .text((d) => d.name)
    .attr('font-size', '14px')
    .attr('fill', '#333')
}

export function drawRelationships(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  layoutTree: Node[],
  linksTree: Relationship[]
) {
  g.selectAll('.link')
    .data(linksTree)
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#999')
    .attr('stroke-width', 4)
    .attr('d', (d) => {
      const sourceNode = layoutTree.find((node) => node.id === d.source)
      const targetNode = layoutTree.find((node) => node.id === d.target)

      if (
        !sourceNode ||
        !targetNode ||
        sourceNode.x == null ||
        sourceNode.y == null ||
        targetNode.x == null ||
        targetNode.y == null
      )
        return ''

      const sx = sourceNode.x + NODE_WIDTH / 2
      const sy = sourceNode.y + NODE_HEIGHT / 2
      const tx = targetNode.x + NODE_WIDTH / 2
      const ty = targetNode.y + NODE_HEIGHT / 2

      if (sourceNode.level === targetNode.level) {
        return `M${sx},${sy} H${tx}`
      }

      if (sourceNode.level !== targetNode.level! - 1) {
        return ''
      }

      const parentsNode = layoutTree.filter(
        (node) =>
          node.level === sourceNode.level &&
          linksTree.some(
            (link) => link.source === node.id && link.target === targetNode.id
          )
      )

      if (parentsNode.length < 2) return ''
      const middleX = (parentsNode[0].x! + parentsNode[1].x! + NODE_WIDTH) / 2
      const verticalStart = parentsNode[0].y! + NODE_HEIGHT / 2
      const verticalStop = verticalStart + 80

      return `M${middleX},${verticalStart} V${verticalStop} H${tx} V${ty}`
    })
}
