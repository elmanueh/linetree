export type Tree = {
  id: string
  name: string
}

export interface Node {
  id: string
  name: string
  children?: Node[]
  spouse?: Node[]
  x?: number
  y?: number
  level?: number
}

export interface Relationship {
  source: string
  target: string
}

export interface GenealogyNode {
  name: string
  firstName: string
  lastName?: string
  birthDate: Date
  deathDate?: Date
  gender: string
}
