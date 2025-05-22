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

// -------------- HOOKS -------------- //

export enum TreeReducerType {
  ALL = 'ALL'
}

export interface ReducerState<T> {
  items: T[]
  loading: boolean
  error: string | null
}

export type ReducerAction<T> =
  | { type: ReducerActionType.START }
  | { type: ReducerActionType.ERROR; payload: string }
  | { type: ReducerActionType.FETCH; payload: T[] }
  | { type: ReducerActionType.CREATE; payload: T }
  | { type: ReducerActionType.DELETE; payload: string }

export enum ReducerActionType {
  START = 'ACTION_START',
  ERROR = 'ACTION_ERROR',
  FETCH = 'FETCH_SUCCESS',
  CREATE = 'CREATE_SUCCESS',
  DELETE = 'DELETE_SUCCESS'
}
