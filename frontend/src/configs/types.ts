import { Node } from '@/configs/api.types'

export type UUID = string

export interface GenealogyNode extends Node {
  x: number
  y: number
  level: number
  spouse: GenealogyNode[]
  children: GenealogyNode[]
}

export interface GenealogyRelation {
  source: UUID
  target: UUID
}

// -------------- HOOKS -------------- //

export enum TreeReducerType {
  ALL = 'ALL',
  BY_ID = 'BY_ID'
}

export enum NodeReducerType {
  BY_ID = 'BY_ID'
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
  | { type: ReducerActionType.DELETE; payload: UUID }
  | { type: ReducerActionType.UPDATE; payload: T }

export enum ReducerActionType {
  START = 'ACTION_START',
  ERROR = 'ACTION_ERROR',
  FETCH = 'FETCH_SUCCESS',
  CREATE = 'CREATE_SUCCESS',
  DELETE = 'DELETE_SUCCESS',
  UPDATE = 'UPDATE_SUCCESS'
}
