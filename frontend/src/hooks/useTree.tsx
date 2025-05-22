import { CreateTree, Tree } from '@/configs/api.types'
import { ReducerAction, ReducerState, TREE_REDUCER } from '@/configs/types'
import { TreeService } from '@/services/treeService'
import { useCallback, useEffect, useReducer } from 'react'

const initialState: ReducerState<Tree> = {
  trees: [],
  loading: true,
  error: null
}

function treeReducer(state: ReducerState<Tree>, action: ReducerAction) {
  switch (action.type) {
    case 'ACTION_START':
      return { ...state, loading: true, error: null }
    case 'ACTION_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, trees: action.payload }
    case 'CREATE_SUCCESS':
      return {
        ...state,
        trees: [...state.trees, action.payload],
        loading: false
      }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        trees: state.trees.filter((tree) => tree.id !== action.payload),
        loading: false
      }
    default:
      return state
  }
}

export function useTree(type: string) {
  const [state, dispatch] = useReducer(treeReducer, initialState)

  const fetchTrees = useCallback(async () => {
    dispatch({ type: 'ACTION_START' })
    try {
      let trees
      switch (type) {
        case TREE_REDUCER.ALL:
          trees = await TreeService.getTrees()
          break
        default:
          throw new TypeError('The tree type is not valid')
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: trees })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
    }
  }, [type])

  const createTree = async (treeData: CreateTree) => {
    dispatch({ type: 'ACTION_START' })
    try {
      const tree = await TreeService.createTree(treeData)
      dispatch({ type: 'CREATE_SUCCESS', payload: tree })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
    }
  }

  const deleteTree = async (id: string) => {
    dispatch({ type: 'ACTION_START' })
    try {
      await TreeService.deleteTree(id)
      dispatch({ type: 'DELETE_SUCCESS', payload: id })
    } catch (error) {
      dispatch({ type: 'ACTION_ERROR', payload: error.message })
    }
  }

  useEffect(() => {
    fetchTrees()
  }, [fetchTrees])

  return {
    trees: state.trees,
    loading: state.loading,
    error: state.error,
    createTree,
    deleteTree
  }
}
