import { CreateNode, UpdateNode } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { HttpService } from '@/services/http.service'

const getGenealogy = async (treeId: string) => {
  const response = await fetch(API_URLS.GENEALOGY(treeId))
  if (!response.ok) {
    throw new Error('Error fetching genealogy data')
  }
  return response.json()
}

const createNode = async (treeId: string, nodeData: CreateNode) => {
  const response = await HttpService.post(API_URLS.NODES(treeId), nodeData)
  return response
}

const deleteNode = async (treeId: string, id: string) => {
  const response = await HttpService.del(API_URLS.NODE(treeId, id))
  return response
}

const updateNode = async (treeId: string, id: string, nodeData: UpdateNode) => {
  const response = await HttpService.patch(API_URLS.NODE(treeId, id), nodeData)
  return response
}

const getNodes = async (treeId: string) => {
  const response = await HttpService.get(API_URLS.NODES(treeId))
  return response
}

const getNode = async (treeId: string, id: string) => {
  const response = await HttpService.get(API_URLS.NODE(treeId, id))
  return response
}

export const NodeService = {
  getGenealogy,
  createNode,
  deleteNode,
  updateNode,
  getNodes,
  getNode
}
