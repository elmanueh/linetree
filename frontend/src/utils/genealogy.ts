import { NodeGenderType, NodeRelationType } from '@/configs/constants'
import { GenealogyNode, GenealogyRelation, UUID } from '@/configs/types'
import { NodeObject } from 'jsonld'

export function parseGenealogy(genealogy: NodeObject[]) {
  const nodes = new Map<UUID, GenealogyNode>()
  const relations: GenealogyRelation[] = []

  const getNode = (nodeObject: NodeObject | UUID) => {
    const rawId =
      typeof nodeObject === 'string' ? nodeObject : (nodeObject['id'] as UUID)
    const nodeId = rawId.split('/').pop()!
    return nodes.get(nodeId)!
  }

  const createRelationships = (sourceId: UUID, nodes: GenealogyNode[]) => {
    nodes.forEach((node) => {
      const targetId = node.id
      if (sourceId !== targetId) {
        relations.push({ source: sourceId, target: targetId })
      }
    })
  }

  // initialize nodes map
  genealogy.forEach((nodeObject) => {
    const rawId = nodeObject['id'] as UUID
    const nodeId = rawId.split('/').pop()!

    const node: GenealogyNode = {
      id: nodeId,
      birthDate: nodeObject['birthDate'] as string,
      deathDate: nodeObject['deathDate'] as string,
      familyName: nodeObject['familyName'] as string,
      gender: nodeObject['gender'] as NodeGenderType,
      givenName: nodeObject['givenName'] as string,
      x: 0,
      y: 0,
      level: 0,
      spouse: [],
      children: []
    }

    nodes.set(nodeId, node)
  })

  // add relations
  genealogy.forEach((nodeObject) => {
    const current = getNode(nodeObject)

    if (nodeObject[NodeRelationType.SPOUSE]) {
      const spouses = Array.isArray(nodeObject[NodeRelationType.SPOUSE])
        ? (nodeObject[NodeRelationType.SPOUSE] as NodeObject[])
        : ([nodeObject[NodeRelationType.SPOUSE]] as NodeObject[])

      current.spouse = spouses.map((spouse) => getNode(spouse))
      createRelationships(current.id, current.spouse)
    }

    if (nodeObject[NodeRelationType.CHILDREN]) {
      const children = Array.isArray(nodeObject[NodeRelationType.CHILDREN])
        ? (nodeObject[NodeRelationType.CHILDREN] as NodeObject[])
        : ([nodeObject[NodeRelationType.CHILDREN]] as NodeObject[])

      current.children = children.map((children) => getNode(children))
      createRelationships(current.id, current.children)
    }
  })

  // find root node
  const childIds = new Set<UUID>()
  nodes.forEach((node) => {
    node.children.forEach((child) => childIds.add(child.id))
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
