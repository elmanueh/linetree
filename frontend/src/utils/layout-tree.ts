import {
  CHILD_SPACING,
  NODE_WIDTH,
  SPOUSE_SPACING,
  VERTICAL_SPACING
} from '@/configs/constants'
import { Node } from '@/configs/types'

// ---------- Constants ----------
const nodes: Node[] = []
const visited = new Map<string, Node>()
const POS_X = 800
const POS_Y = 300

// get the width of the tree
function getTreeWidth(node: Node): number {
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
function addNode(node: Node, x: number, y: number, level: number): Node | void {
  const existing = visited.get(node.id)
  if (existing) return

  const nodeNew = { ...node, x, y, level }
  visited.set(node.id, nodeNew)
  nodes.push(nodeNew)
  return nodeNew
}

// layout the tree recursively
function layoutTree(node: Node, x: number, y: number, level: number) {
  const currentNode = addNode(node, x, y, level)
  if (!currentNode) return
  const nextLevel = y + VERTICAL_SPACING

  // spouses
  if (node.spouse) {
    node.spouse.forEach((spouse: Node, i: number) => {
      const px = x + NODE_WIDTH + SPOUSE_SPACING + i * SPOUSE_SPACING
      addNode(spouse, px, y, level)
    })
  }

  // children
  if (node.children && node.children.length > 0) {
    let treeWidth = x + NODE_WIDTH + SPOUSE_SPACING / 2 - getTreeWidth(node) / 2
    node.children.forEach((child: Node) => {
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

export default function generateLayoutTree(data: Node) {
  nodes.splice(0, nodes.length)
  visited.clear()
  layoutTree(data, POS_X, POS_Y, 0)
  return nodes
}
