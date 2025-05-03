import { Node, Relationship } from '@/configs/types'
import { NodeObject } from 'jsonld'

export function parseGenealogy(genealogy: NodeObject[]) {
  const nodes = new Map<string, Node>()
  const relations: Relationship[] = []

  function getNode(nodeObject: NodeObject | string): Node {
    const rawId =
      typeof nodeObject === 'string' ? nodeObject : (nodeObject['id'] as string)
    const nodeId = rawId.split('/').pop()!
    return nodes.get(nodeId)!
  }

  function createRelationships(sourceId: string, nodes: Node[]) {
    nodes.forEach((node) => {
      const targetId = node.id
      if (sourceId !== targetId) {
        relations.push({
          source: sourceId,
          target: targetId
        })
      }
    })
  }

  // initialize nodes map
  genealogy.forEach((nodeObject) => {
    const rawId = nodeObject['id'] as string
    const nodeId = rawId.split('/').pop()!

    nodes.set(nodeId, {
      id: nodeId,
      name: nodeObject['name'] as string
    })
  })

  // add relationships
  genealogy.forEach((nodeObject) => {
    const current = getNode(nodeObject)

    if (nodeObject['spouse']) {
      const spouses = Array.isArray(nodeObject['spouse'])
        ? (nodeObject['spouse'] as NodeObject[])
        : ([nodeObject['spouse']] as NodeObject[])

      current.spouse = spouses.map((spouse) => getNode(spouse))
      createRelationships(current.id, current.spouse)
    }

    if (nodeObject['children']) {
      const children = Array.isArray(nodeObject['children'])
        ? (nodeObject['children'] as NodeObject[])
        : ([nodeObject['children']] as NodeObject[])

      current.children = children.map((children) => getNode(children))
      createRelationships(current.id, current.children)
    }
  })

  // find root node
  const childIds = new Set<string>()
  nodes.forEach((node) => {
    node.children?.forEach((child) => childIds.add(child.id))
  })

  const rootNodes = Array.from(nodes.values()).filter(
    (node) => !childIds.has(node.id)
  )
  const root = rootNodes[0] ?? null

  return {
    root,
    relations
  }
}
