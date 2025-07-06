import { CreateNode, Node, UpdateNode } from '@/configs/api.types'
import {
  NodeReducerType,
  ReducerAction,
  ReducerActionType,
  ReducerState,
  UUID
} from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { NodeService } from '@/services/node.service'
import { useCallback, useEffect, useReducer } from 'react'

const initialState: ReducerState<Node> = {
  items: [],
  loading: true,
  error: null
}

function nodeReducer(state: ReducerState<Node>, action: ReducerAction<Node>) {
  switch (action.type) {
    case ReducerActionType.START:
      return { ...state, loading: true, error: null }
    case ReducerActionType.ERROR:
      return { ...state, loading: false, error: action.payload }
    case ReducerActionType.FETCH:
      return { ...state, loading: false, items: action.payload }
    case ReducerActionType.CREATE:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      }
    case ReducerActionType.DELETE:
      return {
        ...state,
        items: state.items.filter((node) => node.id !== action.payload),
        loading: false
      }
    case ReducerActionType.UPDATE:
      return {
        ...state,
        items: state.items.map((node) =>
          node.id === action.payload.id ? action.payload : node
        ),
        loading: false
      }
    default:
      return state
  }
}

export function useNode(type: NodeReducerType | null) {
  const [state, dispatch] = useReducer(nodeReducer, initialState)
  const { treeId, nodeId, handleSelectedNode, handleIterator } = useGenealogy()

  const fetchNode = useCallback(async () => {
    dispatch({ type: ReducerActionType.START })
    try {
      let nodes: Node[] = []
      switch (type) {
        case NodeReducerType.BY_ID:
          nodes = [await NodeService.getNode(treeId, nodeId)]
          break
        default:
          throw new TypeError('The tree type is not valid')
      }
      dispatch({ type: ReducerActionType.FETCH, payload: nodes })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }, [type, treeId, nodeId])

  const createNode = async (data: CreateNode) => {
    //console.log('Creating node', data)
    dispatch({ type: ReducerActionType.START })
    try {
      const node = await NodeService.createNode(treeId, data)
      dispatch({ type: ReducerActionType.CREATE, payload: node! })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
    handleIterator()
  }

  const deleteNode = async (id: UUID) => {
    //console.log('Deleting node', id)
    dispatch({ type: ReducerActionType.START })
    try {
      await NodeService.deleteNode(treeId, id)
      dispatch({ type: ReducerActionType.DELETE, payload: id })
      handleSelectedNode('')
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
    handleIterator()
  }

  const updateNode = async (id: UUID, data: UpdateNode) => {
    //console.log('Updating node', id, data)
    dispatch({ type: ReducerActionType.START })
    try {
      const node = await NodeService.updateNode(treeId, id, data)
      dispatch({ type: ReducerActionType.UPDATE, payload: node })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
    handleIterator()
  }

  useEffect(() => {
    fetchNode()
  }, [fetchNode])

  return {
    nodes: state.items,
    loading: state.loading,
    error: state.error,
    createNode,
    deleteNode,
    updateNode
  }
}
