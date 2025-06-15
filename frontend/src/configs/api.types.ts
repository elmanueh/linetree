import { NodeGenderType, NodeRelationType } from '@/configs/constants'
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
  spouseId?: UUID
  relation: NodeRelationType
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

// ---------- AUTH -------------
export interface RegisterUser {
  birthDate: Date
  email: string
  firstName: string
  gender: NodeGenderType
  lastName: string
  password: string
}

export interface User {
  id: UUID
  birthDate: Date
  email: string
  firstName: string
  gender: NodeGenderType
  lastName: string
}
