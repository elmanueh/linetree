import { NODE_HEIGHT, NODE_WIDTH } from '@/configs/genealogy.style'
import { GenealogyNode, GenealogyRelation } from '@/configs/types'

export function getLinkPath(
  relation: GenealogyRelation,
  nodes: GenealogyNode[]
): string {
  const source = nodes.find((n) => n.id === relation.source)!
  const target = nodes.find((n) => n.id === relation.target)!

  const sx = source.x + NODE_WIDTH / 2
  const sy = source.y + NODE_HEIGHT / 2
  const tx = target.x + NODE_WIDTH / 2
  const ty = target.y + NODE_HEIGHT / 2

  // spouse to spouse
  if (source.level === target.level) {
    const hasSpouse = source.spouse?.some((s) => s.id === target.id) ?? false
    let adjustedY = sy

    if (hasSpouse) {
      const spouseIndex = source.spouse.findIndex((s) => s.id === target.id)
      const verticalOffset = 6
      adjustedY = sy - spouseIndex * verticalOffset
    }

    return `M${sx},${adjustedY} H${tx}`
  }

  const parents = nodes.filter((n) =>
    n.children.find((c) => c.id === target.id)
  )

  if (parents.length < 2) return ''

  const midX = (parents[0].x + parents[1].x + NODE_WIDTH) / 2
  const verticalStart = parents[0].y! + NODE_HEIGHT / 2
  const verticalStop = verticalStart + 80

  return `M${midX},${verticalStart} V${verticalStop} H${tx} V${ty}` // parent to child
}
