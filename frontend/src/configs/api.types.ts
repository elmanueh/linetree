import { NodeGenderType } from '@/configs/constants'
import { UUID } from '@/configs/types'

// ------------ TREE -------------

export interface GetTrees {
  trees: Tree[]
}

export interface Tree {
  id: UUID
  name: string
  nodes: UUID[]
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
    gender: NodeGenderType
  }
}

export interface UpdateNode {
  name?: string
}

export interface Node {
  id: UUID
  name: string
  gender: NodeGenderType
  birthDate: string
  deathDate: string
}
