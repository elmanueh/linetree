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
    birthDate?: Date
    familyName?: string
    gender: NodeGenderType
    givenName: string
  }
}

export interface UpdateNode {
  birthDate?: Date
  familyName?: string
  gender?: NodeGenderType
  givenName?: string
}

export interface Node {
  id: UUID
  birthDate?: string
  deathDate?: string
  familyName?: string
  gender: NodeGenderType
  givenName: string
}
