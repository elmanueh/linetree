import { UUID } from '@/configs/types'

const URL_GATEWAY = 'http://localhost:3000'

export const API_URLS = {
  // ---------- AUTH -----------
  AUTH_LOGIN: `${URL_GATEWAY}/api/auth/login`,
  AUTH_LOGOUT: `${URL_GATEWAY}/api/auth/logout`,
  AUTH_REGISTER: `${URL_GATEWAY}/api/auth/register`,
  AUTH_GET_USER: `${URL_GATEWAY}/api/auth/user`,

  // ---------- GENEALOGY -----------
  TREES: `${URL_GATEWAY}/api/trees`,
  TREE: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}`,
  GENEALOGY: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/genealogy`,
  NODES: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/nodes`,
  NODE: (treeId: UUID, nodeId: UUID) =>
    `${URL_GATEWAY}/api/trees/${treeId}/nodes/${nodeId}`,
  EXPORT_GEDCOM: (id: UUID) => `${URL_GATEWAY}/api/trees/${id}/gedcom`,
  IMPORT_GEDCOM: `${URL_GATEWAY}/api/trees/gedcom`
}

export const NAV_ROUTES = {
  OVERVIEW: '/',
  HOME: '/home',
  TREE: (id: UUID) => `/${id}`,
  LOGIN: '/login',
  REGISTER: '/register'
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
