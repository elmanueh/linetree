import {
  NODE_HEIGHT,
  NODE_WIDTH,
  VERTICAL_SPACING
} from '@/configs/genealogy.style'
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

  // parent to child
  const parents = nodes.filter((n) =>
    n.children.some((c) => c.id === target.id)
  )

  if (parents.length === 1) {
    const parent = parents[0]
    const connectX = parent.x + NODE_WIDTH / 2
    const connectY = parent.y + NODE_HEIGHT / 2
    const offsetY = connectY + VERTICAL_SPACING / 2

    return `M${connectX},${connectY} V${offsetY} H${tx} V${ty}`
  }

  const [p1, p2] =
    parents[0].spouse.length >= parents[1].spouse.length
      ? [parents[0], parents[1]]
      : [parents[1], parents[0]]
  const isFirstPartner = p1.spouse.findIndex((s) => s.id === p2.id) === 0

  const connectX = isFirstPartner
    ? (p1.x + p2.x + NODE_WIDTH) / 2
    : p2.x + NODE_WIDTH / 2
  const connectY = p1.y + NODE_HEIGHT / 2
  const offsetY = connectY + VERTICAL_SPACING / 2

  return `M${connectX},${connectY} V${offsetY} H${tx} V${ty}`
}
