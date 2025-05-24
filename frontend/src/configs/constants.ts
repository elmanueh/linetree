import { UUID } from '@/configs/types'

const URL_GATEWAY = 'http://localhost:3000'

export const API_URLS = {
  TREES: `${URL_GATEWAY}/api/trees`,
  TREE: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}`,
  GENEALOGY: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/genealogy`,
  NODES: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/nodes`,
  NODE: (treeId: UUID, nodeId: UUID) =>
    `${URL_GATEWAY}/api/trees/${treeId}/nodes/${nodeId}`
}

export const NAV_ROUTES = {
  HOME: '/',
  TREE: (id: UUID) => `/${id}`
}

export enum NodeRelationType {
  SPOUSE = 'spouse',
  CHILDREN = 'children'
}

export enum NodeGenderType {
  MALE = 'male',
  FEMALE = 'female'
}
