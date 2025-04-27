import { GenealogyNode, Node, Relationship } from '@/data/tree'

const nodes = new Map<string, Node>()

export function getGenealogyNodes(jsonld: GenealogyNode[]): Node {
  nodes.clear()

  jsonld.forEach((item) => {
    const nodeId = item['@id'].split('/').pop()!
    if (!nodes.get(nodeId)) {
      nodes.set(nodeId, {
        id: nodeId,
        label: nodeId
      })
    }
  })

  jsonld.forEach((item) => {
    const nodeId = item['@id'].split('/').pop()!
    const currentNode = nodes.get(nodeId)!

    // Parejas
    if (item['http://schema.org/spouse']) {
      currentNode.partner = item['http://schema.org/spouse'].map(
        (spouse: any) => {
          const spouseId = spouse['@id'].split('/').pop()!
          if (!nodes.get(spouseId)) {
            nodes.set(spouseId, { id: spouseId, label: `${spouseId}` })
          }
          return nodes.get(spouseId)!
        }
      )
    }

    if (item['http://schema.org/children']) {
      currentNode.children = item['http://schema.org/children'].map(
        (child: any) => {
          const childId = child['@id'].split('/').pop()!
          if (!nodes.get(childId)) {
            nodes.set(childId, { id: childId, label: `${childId}` })
          }
          return nodes.get(childId)!
        }
      )
    }
  })

  const childIds = new Set<string>()
  nodes.forEach((node) => {
    node.children?.forEach((child) => {
      childIds.add(child?.id)
    })
  })

  const rootNodes = Array.from(nodes.values()).filter(
    (node) => !childIds.has(node.id)
  )

  return rootNodes.length > 0 ? rootNodes[0] : null
}

export function getGenealogyRelations(): Relationship[] {
  const relations: Relationship[] = []

  nodes.forEach((node) => {
    if (node.partner) {
      node.partner.forEach((partner) => {
        const relation: Relationship = { source: node.id, target: partner.id }
        relations.push(relation)
      })
    }

    if (node.children) {
      node.children.forEach((child) => {
        const relation: Relationship = { source: node.id, target: child.id }
        relations.push(relation)
      })
    }
  })

  return relations
}
