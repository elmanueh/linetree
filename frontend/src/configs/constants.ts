import { UUID } from '@/configs/types'

const URL_GATEWAY = 'http://localhost:3000'

export const API_URLS = {
  TREES: `${URL_GATEWAY}/api/trees`,
  TREE: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}`,
  GENEALOGY: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/genealogy`,
  NODES: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/nodes`,
  NODE: (treeId: UUID, nodeId: UUID) =>
    `${URL_GATEWAY}/api/trees/${treeId}/nodes/${nodeId}`,
  EXPORT_GEDCOM: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/gedcom`
}

export const NAV_ROUTES = {
  HOME: '/',
  TREE: (id: UUID) => `/${id}`
}

export enum NodeRelationType {
  CHILDREN = 'children',
  PARENT = 'parent',
  SPOUSE = 'spouse'
}

export enum NodeGenderType {
  MALE = 'male',
  FEMALE = 'female'
}
