import { NodeGenderType } from '@/configs/constants'
import { NODE_HEIGHT, NODE_WIDTH } from '@/configs/genealogy.style'
import { GenealogyNode, UUID } from '@/configs/types'
import * as d3 from 'd3'
import './genealogy.css'

function getNodeClass(gender: NodeGenderType) {
  switch (gender) {
    case NodeGenderType.MALE:
      return 'node-rect male'
    case NodeGenderType.FEMALE:
      return 'node-rect female'
    case NodeGenderType.OTHER:
      return 'node-rect other'
    default:
      return 'node-rect other'
  }
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

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
    .attr('class', (d) => `node-rect ${getNodeClass(d.gender)}`)
    .attr('width', NODE_WIDTH)
    .attr('height', NODE_HEIGHT)
    .attr('rx', 12)
    .attr('ry', 12)

  nodeGroup
    .append('circle')
    .attr('cx', 30)
    .attr('cy', NODE_HEIGHT / 2)
    .attr('r', 20)
    .attr('class', (d) => `node-image-bg ${getNodeClass(d.gender)}`)

  nodeGroup
    .append('image')
    .attr('class', 'node-image')
    .attr('x', 10)
    .attr('y', NODE_HEIGHT / 2 - 20)
    .attr('width', 40)
    .attr('height', 40)
    .attr('clip-path', 'circle(20 at 20 20)')
    .attr('href', (d) =>
      d.gender === NodeGenderType.MALE ? '/male.svg' : '/female.svg'
    )

  nodeGroup
    .append('text')
    .attr('class', 'node-name')
    .attr('x', 60)
    .attr('y', (d) => {
      return d.birthDate ? NODE_HEIGHT / 2 - 5 : NODE_HEIGHT / 2 + 5
    })
    .text((d) => {
      const name = [d.givenName, d.familyName].filter(Boolean).join(' ')
      const maxLength = 20
      return name.length > maxLength ? name.slice(0, maxLength - 1) + '…' : name
    })

  nodeGroup
    .append('text')
    .attr('class', 'node-dates')
    .attr('x', 60)
    .attr('y', NODE_HEIGHT / 2 + 15)
    .text((d) => {
      const birth = d.birthDate ? formatDate(d.birthDate).slice(-4) : null
      const death = d.deathDate ? formatDate(d.deathDate).slice(-4) : null

      if (birth && death) {
        return `${birth} - ${death}`
      } else if (birth) {
        return `${birth}`
      } else {
        return ''
      }
    })
}
