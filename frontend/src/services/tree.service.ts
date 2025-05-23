import { CreateTree, GetTrees, Tree } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { HttpService } from '@/services/http.service'

const getTrees = async () => {
  const trees = await HttpService.get<GetTrees>(API_URLS.TREES)
  return trees.trees
}

const createTree = async (treeData: CreateTree) => {
  const response = await HttpService.post(API_URLS.TREES, treeData)
  const location = response.headers.get('location')
  const id = location?.split('/').pop()

  const response2 = await HttpService.get<Tree>(API_URLS.TREE(id!))
  return response2
}

const deleteTree = async (id: string) => {
  const response = await HttpService.del(API_URLS.TREE(id))
  return response
}

export const TreeService = {
  getTrees,
  createTree,
  deleteTree
}
