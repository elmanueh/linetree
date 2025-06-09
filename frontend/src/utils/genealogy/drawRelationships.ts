import { GenealogyNode, GenealogyRelation, UUID } from '@/configs/types'
import { getLinkPath } from '@/utils/genealogy/getLinkPath'
import * as d3 from 'd3'
import './genealogy.css'

function filterRelations(
  relations: GenealogyRelation[],
  nodes: GenealogyNode[]
): GenealogyRelation[] {
  const seen = new Set<UUID>()
  const getLevel = (id: UUID) => nodes.find((n) => n.id === id)?.level ?? 0

  return relations.filter((rel) => {
    const levelSource = getLevel(rel.source)
    const levelTarget = getLevel(rel.target)

    // spouse to spouse
    if (levelSource === levelTarget) {
      const key = [rel.source, rel.target].sort().join('-')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }

    // parent to child
    if (levelSource < levelTarget) {
      const key = `${rel.source}->${rel.target}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }

    // other cases
    return false
  })
}

export function drawRelationships(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: GenealogyNode[],
  relations: GenealogyRelation[]
) {
  g.selectAll('.link')
    .data(filterRelations(relations, nodes))
    .join('path')
    .attr('class', 'link')
    .attr('d', (relation) => getLinkPath(relation, nodes))
}
