import { CreateTree, Tree } from '@/configs/api.types'
import {
  ReducerAction,
  ReducerActionType,
  ReducerState,
  TreeReducerType,
  UUID
} from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { TreeService } from '@/services/tree.service'
import { useCallback, useEffect, useReducer } from 'react'
import toast from 'react-hot-toast'

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
  const { treeId } = useGenealogy()

  const fetchTrees = useCallback(async () => {
    dispatch({ type: ReducerActionType.START })
    try {
      let trees
      switch (type) {
        case TreeReducerType.ALL:
          trees = await TreeService.getTrees()
          break
        case TreeReducerType.BY_ID:
          trees = [await TreeService.getTree(treeId)]
          break
        default:
          throw new TypeError('The tree type is not valid')
      }
      dispatch({ type: ReducerActionType.FETCH, payload: trees })
    } catch (error) {
      toast.error('Error cargando los árboles')
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }, [type, treeId])

  const createTree = async (data: CreateTree) => {
    //console.log('Creating tree', data)
    dispatch({ type: ReducerActionType.START })
    try {
      const tree = await TreeService.createTree(data)
      if (!tree) {
        toast.error('Error creando el árbol')
      } else {
        dispatch({ type: ReducerActionType.CREATE, payload: tree })
        toast.success('Árbol creado correctamente')
      }
    } catch (error) {
      toast.error('Error creando el árbol')
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }

  const deleteTree = async (id: UUID) => {
    //console.log('Deleting tree', id)
    dispatch({ type: ReducerActionType.START })
    try {
      await TreeService.deleteTree(id)
      toast.success('Árbol eliminado correctamente')
      dispatch({ type: ReducerActionType.DELETE, payload: id })
    } catch (error) {
      toast.error('Error eliminando el árbol')
      if (error instanceof Error)
        dispatch({ type: ReducerActionType.ERROR, payload: error.message })
    }
  }

  const createTreeWithFile = async (fileData: string) => {
    //console.log('Creating tree with file data', fileData)
    dispatch({ type: ReducerActionType.START })
    try {
      const tree = await TreeService.importGedcom(fileData)
      if (!tree) {
        toast.error('Error importando el árbol')
      } else {
        dispatch({ type: ReducerActionType.CREATE, payload: tree })
        toast.success('Árbol importado correctamente')
      }
    } catch (error) {
      toast.error('Error importando el árbol')
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
    createTreeWithFile,
    deleteTree
  }
}
