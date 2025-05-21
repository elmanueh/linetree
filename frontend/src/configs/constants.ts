const URL_GATEWAY = 'http://localhost:3000'

export const API_URLS = {
  TREES: `${URL_GATEWAY}/api/trees`,
  TREE: (id: string) => `${URL_GATEWAY}/api/trees/${id}`,
  GENEALOGY: (id: string) => `${URL_GATEWAY}/api/trees/${id}/genealogy`,
  NODES: (id: string) => `${URL_GATEWAY}/api/trees/${id}/nodes`,
  NODE: (treeId: string, nodeId: string) =>
    `${URL_GATEWAY}/api/trees/${treeId}/nodes/${nodeId}`
}

export const NAV_ROUTES = {
  HOME: '/'
}

export const NODE_RELATIONS = {
  SPOUSE: 'spouse',
  CHILDREN: 'children'
}

export const NODE_WIDTH = 150
export const NODE_HEIGHT = 60
export const SPOUSE_SPACING = 30
export const CHILD_SPACING = 40
export const VERTICAL_SPACING = 150
