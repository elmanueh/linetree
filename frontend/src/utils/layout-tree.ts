import {
  CHILD_SPACING,
  NODE_WIDTH,
  SPOUSE_SPACING,
  VERTICAL_SPACING
} from '@/configs/genealogy.style'
import { GenealogyNode, UUID } from '@/configs/types'

// ---------- Constants ----------
const nodes: GenealogyNode[] = []
const visited = new Map<UUID, GenealogyNode>()
const POS_X = 800
const POS_Y = 300

// get the width of the tree
function getTreeWidth(node: GenealogyNode): number {
  const minWidth = 2 * NODE_WIDTH + SPOUSE_SPACING
  if (!node.spouse || node.spouse.length === 0) return NODE_WIDTH
  if (!node.children || node.children.length === 0) return minWidth

  let treeWidth = 0
  node.children.forEach((child) => {
    treeWidth += getTreeWidth(child) + CHILD_SPACING
  })

  return Math.max(treeWidth - CHILD_SPACING, minWidth)
}

// add node to the visited map and nodes array
function addNode(
  node: GenealogyNode,
  x: number,
  y: number,
  level: number
): GenealogyNode | void {
  const existing = visited.get(node.id)
  if (existing) return

  const nodeNew = { ...node, x, y, level }
  visited.set(node.id, nodeNew)
  nodes.push(nodeNew)
  return nodeNew
}

// layout the tree recursively
function layoutTree(node: GenealogyNode, x: number, y: number, level: number) {
  const currentNode = addNode(node, x, y, level)
  if (!currentNode) return
  const nextLevel = y + VERTICAL_SPACING

  // spouses
  if (node.spouse.length > 0) {
    let px =
      x + NODE_WIDTH + SPOUSE_SPACING / 2 - getTreeWidth(node.spouse[0]) / 2
    node.spouse.forEach((spouse: GenealogyNode, index: number) => {
      px +=
        index === 0
          ? getTreeWidth(spouse) / 2 + SPOUSE_SPACING / 2
          : getTreeWidth(spouse) / 2 - NODE_WIDTH / 2
      addNode(spouse, px, y, level)
      px += -SPOUSE_SPACING / 2 + getTreeWidth(spouse) / 2 + CHILD_SPACING
    })
  }

  // children
  if (node.children.length > 0) {
    let treeWidth = x + NODE_WIDTH + SPOUSE_SPACING / 2
    treeWidth -=
      node.spouse.length > 0
        ? getTreeWidth(node.spouse[0]) / 2
        : getTreeWidth(node) / 2

    node.children
      .sort((a, b) => {
        const getMotherIndex = (child: GenealogyNode) => {
          return (
            node.spouse?.findIndex((spouse) =>
              spouse.children?.some(
                (spouseChild) => spouseChild.id === child.id
              )
            ) ?? -1
          )
        }

        return getMotherIndex(a) - getMotherIndex(b)
      })
      .forEach((child: GenealogyNode) => {
        const childTreeWidth = getTreeWidth(child)
        const offset =
          child.spouse && child.spouse?.length != 0
            ? SPOUSE_SPACING / 2 + NODE_WIDTH
            : NODE_WIDTH / 2
        layoutTree(
          child,
          treeWidth + childTreeWidth / 2 - offset,
          nextLevel,
          level + 1
        )
        treeWidth += childTreeWidth + CHILD_SPACING
      })
  }
}

export default function generateLayoutTree(data: GenealogyNode) {
  nodes.splice(0, nodes.length)
  visited.clear()
  layoutTree(data, POS_X, POS_Y, 0)
  return nodes
}
