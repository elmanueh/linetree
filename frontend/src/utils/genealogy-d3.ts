import { Node, NODE_HEIGHT, NODE_WIDTH, Relationship } from '@/data/tree'
import * as d3 from 'd3'

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
    .attr('d', (d: Relationship) => {
      const sourceNode = layoutTree.find((node: Node) => node.id === d.source)
      const targetNode = layoutTree.find((node: Node) => node.id === d.target)

      if (
        !sourceNode ||
        !targetNode ||
        !sourceNode.x ||
        !sourceNode.y ||
        !targetNode.x ||
        !targetNode.y
      )
        return

      if (sourceNode.level === targetNode.level) {
        return `M${sourceNode.x + NODE_WIDTH / 2},${
          sourceNode.y + NODE_HEIGHT / 2
        } H${targetNode.x + NODE_WIDTH / 2}`
      }

      if (sourceNode.level === targetNode.level - 1) {
        const parentsNode = layoutTree.filter(
          (node) =>
            node.level === sourceNode.level &&
            linksTree.some(
              (link) => link.source === node.id && link.target === targetNode.id
            )
        )

        if (parentsNode.length === 0) return
        const middleX = (parentsNode[0].x + parentsNode[1].x + NODE_WIDTH) / 2
        const verticalStart = parentsNode[0].y + NODE_HEIGHT / 2
        const verticalStop = verticalStart + 80
        const childX = targetNode.x + NODE_WIDTH / 2

        return `M${middleX},${verticalStart} V${verticalStop} H${childX} V${targetNode.y}`
      }
    })
}

export function drawNodes(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  layoutTree: Node[],
  setSelectedNode: (id: string) => void
) {
  const node = g
    .selectAll('.node')
    .data(layoutTree)
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d: Node) => `translate(${d.x},${d.y})`)
    .on('click', (event, d) => setSelectedNode(d.id))

  node
    .append('rect')
    .attr('width', NODE_WIDTH)
    .attr('height', NODE_HEIGHT)
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('fill', '#fff')
    .attr('stroke', (d: Node) =>
      d.label.includes('Fabiana') || d.label.includes('Perez')
        ? '#fc8181'
        : '#17b4ce'
    )
    .attr('stroke-width', 2)

  node
    .append('image')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 40)
    .attr('height', 40)
    .attr('href', (d: Node) =>
      d.label.includes('Fabiana') || d.label.includes('Perez')
        ? 'https://cf.mhcache.com/FP/Assets/Images/Silhouette/SVG/silhouette-woman.svg'
        : 'https://cf.mhcache.com/FP/Assets/Images/Silhouette/SVG/silhouette-man.svg'
    )

  node
    .append('text')
    .attr('x', 60)
    .attr('y', 35)
    .text((d: Node) => d.label)
    .attr('font-size', '14px')
    .attr('fill', '#333')
}

export function setupZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>
) {
  svg.call(
    d3.zoom().on('zoom', (event) => g.attr('transform', event.transform))
  )
}
