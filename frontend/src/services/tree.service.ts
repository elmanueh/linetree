import { CreateTree, Tree } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { HttpService } from '@/services/http.service'

const getGenealogy = async (treeId: UUID) => {
  return HttpService.get(API_URLS.GENEALOGY(treeId))
}

const createTree = async (data: CreateTree) => {
  const id = await HttpService.post(API_URLS.TREES, data)
  return id ? getTree(id) : null
}

const deleteTree = async (id: UUID) => {
  await HttpService.del(API_URLS.TREE(id))
}

const getTrees = async () => {
  const trees = await HttpService.get<{ trees: Tree[] }>(API_URLS.TREES)
  return trees.trees
}

const getTree = async (id: UUID) => {
  return HttpService.get<Tree>(API_URLS.TREE(id))
}

export const TreeService = {
  getGenealogy,
  getTrees,
  createTree,
  deleteTree
}
