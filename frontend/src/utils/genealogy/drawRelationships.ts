import { GenealogyNode, GenealogyRelation } from '@/configs/types'
import { getLinkPath } from '@/utils/genealogy/getLinkPath'
import * as d3 from 'd3'
import './genealogy.css'

export function drawRelationships(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: GenealogyNode[],
  relations: GenealogyRelation[]
) {
  g.selectAll('.link')
    .data(relations)
    .join('path')
    .attr('class', 'link')
    .attr('d', (relation) => getLinkPath(relation, nodes))
}
