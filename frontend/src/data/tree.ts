export const NODE_WIDTH = 150
export const NODE_HEIGHT = 60
export const PARTNER_SPACING = 30
export const CHILD_SPACING = 40
export const VERTICAL_SPACING = 150

export interface Node {
  id: string
  label: string
  children?: Node[]
  partner?: Node[]
  x?: number
  y?: number
  level?: number
}

export interface Relationship {
  source: string
  target: string
}

export interface GenealogyNode {
  '@id': string
  'http://schema.org/spouse'?: { '@id': string }[]
  'http://schema.org/children'?: { '@id': string }[]
}
