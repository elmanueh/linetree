import { NodeGenderType, NodeRelationType } from '@/configs/constants'
import { GenealogyNode, GenealogyRelation, UUID } from '@/configs/types'
import { NodeObject } from 'jsonld'

export function parseGenealogy(genealogy: NodeObject[]) {
  const nodes = new Map<UUID, GenealogyNode>()
  const relations: GenealogyRelation[] = []

  const getNode = (nodeObject: NodeObject) => {
    const nodeId = nodeObject['@id'] as UUID
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

  const getRootsNode = (nodes: GenealogyNode[]): GenealogyNode[] => {
    // filter nodes without parents
    let nodesFiltered = nodes.filter((n) => n.parent.length === 0)
    // filter nodes with spouses that have no parents
    nodesFiltered = nodesFiltered.filter(
      (n) =>
        n.spouse.length === 0 || n.spouse.some((s) => s.parent.length === 0)
    )
    // filter nodes no repeated by spouse
    nodesFiltered = nodesFiltered.filter((n) => {
      if (n.spouse.length === 0) return true
      return n.spouse.every((s) => n.id < s.id)
    })

    return nodesFiltered
  }

  // initialize nodes map
  genealogy.forEach((nodeObject) => {
    const nodeId = nodeObject['@id'] as UUID
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
      children: [],
      parent: []
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

    if (nodeObject[NodeRelationType.PARENT]) {
      const parents = Array.isArray(nodeObject[NodeRelationType.PARENT])
        ? (nodeObject[NodeRelationType.PARENT] as NodeObject[])
        : ([nodeObject[NodeRelationType.PARENT]] as NodeObject[])

      current.parent = parents.map((parent) => getNode(parent))
      createRelationships(current.id, current.parent)
    }
  })

  const roots = getRootsNode(Array.from(nodes.values()))
  return { roots, relations }
}
