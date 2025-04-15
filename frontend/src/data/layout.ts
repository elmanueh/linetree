import {
  CHILD_SPACING,
  Node,
  NODE_WIDTH,
  PARTNER_SPACING,
  VERTICAL_SPACING
} from './tree'

const nodes: Node[] = []
const visited = new Map<string, Node>()
const POS_X = 700
const POS_Y = 300
const getNodePosX = (
  nodes: number,
  i: number,
  partners: number,
  leftPartners: number,
  posX: number
) =>
  (2 * NODE_WIDTH + PARTNER_SPACING) / 2 -
  (NODE_WIDTH * (nodes + partners) +
    PARTNER_SPACING * partners +
    CHILD_SPACING * (nodes - 1)) /
    2 +
  posX +
  (i + leftPartners) * NODE_WIDTH +
  i * CHILD_SPACING +
  PARTNER_SPACING * leftPartners

function addNode(node: Node, x: number, y: number, level: number) {
  const existing = visited.get(node.id)
  if (existing) return

  const nodeNew = { ...node, x, y, level }
  visited.set(node.id, nodeNew)
  nodes.push(nodeNew) // raro
  return nodeNew
}

function layoutTree(node: Node, x: number, y: number, level: number) {
  // console.log(node)
  // console.log(x, y)
  const currentNode = addNode(node, x, y, level)
  if (!currentNode) return
  const nextY = y + VERTICAL_SPACING //

  // add all partners
  if (Array.isArray(node.partner)) {
    node.partner.forEach((partner: Node, i: number) => {
      const px = x + NODE_WIDTH + PARTNER_SPACING + i * PARTNER_SPACING
      addNode(partner, px, y, level)
    })
  }

  // children
  if (Array.isArray(node.children) && node.children.length > 0) {
    const parents: Node[] = [currentNode]
    if (node.partner) {
      // add partners that share children with the current node
      parents.push(
        ...node.partner.filter((p) =>
          p.children?.some((c) =>
            node.children?.some((child) => child.id === c.id)
          )
        )
      )
    }

    // contamos el numero de parejas que tienen nuestros hijos
    let numPartners = 0
    const childrenPartners: number[] = []
    node.children.forEach((child, index) => {
      if (child.partner) {
        numPartners += child.partner.length
      }
      childrenPartners[index] = numPartners
    })

    node.children.forEach((child: Node, index: number) => {
      layoutTree(
        child,
        getNodePosX(
          node.children?.length,
          index,
          numPartners,
          index - 1 < 0 || !childrenPartners[index - 1]
            ? 0
            : childrenPartners[index - 1],
          currentNode.x
        ),
        nextY,
        level + 1
      )
    })
  }
}

export function createCustomLayout(data: Node) {
  // REVISAR
  nodes.forEach((node) => {
    //console.log(1)
    if (Array.isArray(node.partner)) {
      node.partner.forEach((partner) => {
        if (partner.children) {
          const exclusiveChildren = partner.children.filter(
            (c) => !node.children?.some((child) => child.id === c.id)
          )

          if (exclusiveChildren.length > 0) {
            const nextY = node.y + VERTICAL_SPACING
            const baseX =
              partner.x - ((exclusiveChildren.length - 1) * CHILD_SPACING) / 2
            exclusiveChildren.forEach((child, index) => {
              layoutTree(
                child,
                baseX + index * CHILD_SPACING,
                nextY,
                node.level + 1
              )
            })
          }
        }
      })
    }
  })

  //console.log(2)

  layoutTree(data, POS_X, POS_Y, 0)
  return nodes
}
