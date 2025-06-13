import { CreateTree, Tree } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { HttpService } from '@/services/http.service'
import HttpError from '@/utils/httpError'

const getGenealogy = async (treeId: UUID) => {
  return HttpService.get(API_URLS.GENEALOGY(treeId))
}

const exportGedcom = async (treeId: UUID) => {
  const response = await fetch(API_URLS.EXPORT_GEDCOM(treeId), {
    method: 'GET'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response.text()
}

const importGedcom = async (gedcom: string) => {
  const id = await HttpService.post(API_URLS.IMPORT_GEDCOM, { gedcom })
  return id ? getTree(id) : null
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
  exportGedcom,
  importGedcom,
  getTrees,
  createTree,
  deleteTree
}
