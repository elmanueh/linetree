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
  createdAt: string
  updatedAt: string
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
    address?: string
    birthDate?: string
    birthPlace?: string
    deathDate?: string
    deathPlace?: string
    email?: string
    familyName?: string
    gender: NodeGenderType
    givenName: string
    nationality?: string
    telephone?: string
  }
}

export interface UpdateNode {
  address?: string
  birthDate?: Date | null
  birthPlace?: string
  deathDate?: Date | null
  deathPlace?: string
  email?: string
  familyName?: string
  gender?: NodeGenderType
  givenName?: string
  nationality?: string
  telephone?: string
}

export interface Node {
  id: UUID
  address?: string
  birthDate?: string
  birthPlace?: string
  deathDate?: string
  deathPlace?: string
  email?: string
  familyName?: string
  gender: NodeGenderType
  givenName: string
  nationality?: string
  telephone?: string
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
