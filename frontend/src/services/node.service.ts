import { CreateNode, Node, UpdateNode } from '@/configs/api.types'
import { API_URLS } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { HttpService } from '@/services/http.service'

const createNode = async (treeId: UUID, data: CreateNode) => {
  const id = await HttpService.post(API_URLS.NODES(treeId), data)
  return id ? getNode(treeId, id) : null
}

const deleteNode = async (treeId: UUID, nodeId: UUID) => {
  await HttpService.del(API_URLS.NODE(treeId, nodeId))
}

const updateNode = async (treeId: UUID, nodeId: UUID, data: UpdateNode) => {
  await HttpService.patch<UpdateNode>(API_URLS.NODE(treeId, nodeId), data)
  return getNode(treeId, nodeId)
}

const getNodes = async (treeId: UUID) => {
  return HttpService.get<Node[]>(API_URLS.NODES(treeId))
}

const getNode = async (treeId: UUID, nodeId: UUID) => {
  return HttpService.get<Node>(API_URLS.NODE(treeId, nodeId))
}

export const NodeService = {
  createNode,
  deleteNode,
  updateNode,
  getNodes,
  getNode
}
