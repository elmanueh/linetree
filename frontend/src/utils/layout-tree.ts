import {
  CHILD_SPACING,
  Node,
  NODE_WIDTH,
  PARTNER_SPACING,
  VERTICAL_SPACING
} from '@data/tree'

// ---------- Constants ----------
const nodes: Node[] = []
const visited = new Map<string, Node>()
const POS_X = 800
const POS_Y = 300

// get the width of the tree
function getTreeWidth(node: Node): number {
  const minWidth = 2 * NODE_WIDTH + PARTNER_SPACING
  if (!node.partner || node.partner.length === 0) return NODE_WIDTH
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

  // partners
  if (node.partner) {
    node.partner.forEach((partner: Node, i: number) => {
      const px = x + NODE_WIDTH + PARTNER_SPACING + i * PARTNER_SPACING
      addNode(partner, px, y, level)
    })
  }

  // children
  if (node.children && node.children.length > 0) {
    let treeWidth =
      x + NODE_WIDTH + PARTNER_SPACING / 2 - getTreeWidth(node) / 2
    node.children.forEach((child: Node) => {
      const childTreeWidth = getTreeWidth(child)
      const offset =
        child.partner && child.partner?.length != 0
          ? PARTNER_SPACING / 2 + NODE_WIDTH
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
  layoutTree(data, POS_X, POS_Y, 0)
  return nodes
}
