import { UUID } from '@/configs/types'

// ------------ TREE -------------

export interface GetTrees {
  trees: Array<Tree>
}

export interface Tree {
  id: UUID
  name: string
  nodes: string[]
}

export interface CreateTree {
  name: string
}

// ---------- NODES -----------

export interface CreateNode {
  nodeId: UUID
  relation: string
  nodeInfo: {
    name: string
    firstName: string
    lastName?: string
    birthDate: Date
    deathDate: Date
    gender: string
  }
}

export interface UpdateNode {
  name?: string
}

export interface Node {
  id: UUID
  name: string
  gender: string
  birthDate: string
  deathDate: string
}
