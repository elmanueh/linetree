import { CreateTree, Tree } from '@/configs/api.types'
import {
  ReducerAction,
  ReducerActionType,
  ReducerState,
  TreeReducerType,
  UUID
} from '@/configs/types'
import { TreeService } from '@/services/tree.service'
import { useCallback, useEffect, useReducer } from 'react'

const initialState: ReducerState<Tree> = {
  items: [],
  loading: true,
  error: null
}

function treeReducer(state: ReducerState<Tree>, action: ReducerAction<Tree>) {
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
        items: state.items.filter((tree) => tree.id !== action.payload),
        loading: false
      }
    default:
      return state
  }
}

export function useTree(type: TreeReducerType) {
  const [state, dispatch] = useReducer(treeReducer, initialState)

  const fetchTrees = useCallback(async () => {
    dispatch({ type: ReducerActionType.START })
    try {
      let trees
      switch (type) {
        case TreeReducerType.ALL:
          trees = await TreeService.getTrees()
          break
        default:
          throw new TypeError('The tree type is not valid')
      }
      dispatch({ type: ReducerActionType.FETCH, payload: trees })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }, [type])

  const createTree = async (data: CreateTree) => {
    //console.log('Creating tree', data)
    dispatch({ type: ReducerActionType.START })
    try {
      const tree = await TreeService.createTree(data)
      dispatch({ type: ReducerActionType.CREATE, payload: tree! })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }

  const deleteTree = async (id: UUID) => {
    //console.log('Deleting tree', id)
    dispatch({ type: ReducerActionType.START })
    try {
      await TreeService.deleteTree(id)
      dispatch({ type: ReducerActionType.DELETE, payload: id })
    } catch (error) {
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }

  useEffect(() => {
    fetchTrees()
  }, [fetchTrees])

  return {
    trees: state.items,
    loading: state.loading,
    error: state.error,
    createTree,
    deleteTree
  }
}
