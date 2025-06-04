import { NodeGenderType } from '@/configs/constants'
import { NODE_HEIGHT, NODE_WIDTH } from '@/configs/genealogy.style'
import { GenealogyNode, UUID } from '@/configs/types'
import * as d3 from 'd3'
import './genealogy.css'

export function drawNodes(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: GenealogyNode[],
  setSelectedNode: (id: UUID) => void
) {
  const nodeGroup = g
    .selectAll<SVGGElement, GenealogyNode>('.node')
    .data(nodes)
    .join('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .on('click', (_, d) => setSelectedNode(d.id))

  nodeGroup
    .append('rect')
    .attr('class', (d) =>
      d.gender === NodeGenderType.MALE ? 'node-rect male' : 'node-rect female'
    )
    .attr('width', NODE_WIDTH)
    .attr('height', NODE_HEIGHT)

  nodeGroup
    .append('image')
    .attr('class', 'node-image')
    .attr('x', 10)
    .attr('y', NODE_HEIGHT / 2 - 20)
    .attr('href', (d) =>
      d.gender === NodeGenderType.MALE ? '/male.svg' : '/female.svg'
    )

  nodeGroup
    .append('text')
    .attr('class', 'node-name')
    .attr('x', 60)
    .attr('y', 35)
    .text((d) => d.givenName)

  nodeGroup
    .append('text')
    .attr('x', 60)
    .attr('y', 55)
    .attr('class', 'node-dates')
    .text((d) => {
      const birth = d.birthDate
        ? new Date(d.birthDate).toLocaleDateString()
        : ''
      const death = d.deathDate
        ? new Date(d.deathDate).toLocaleDateString()
        : ''
      return `${birth} - ${death}`
    })
}
