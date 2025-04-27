const URL_GATEWAY = 'http://localhost:3000'

export const API_URLS = {
  TREES: `${URL_GATEWAY}/api/trees`,
  TREE: (id: string) => `${URL_GATEWAY}/api/trees/${id}`,
  GENEALOGY: (id: string) => `${URL_GATEWAY}/api/trees/${id}/genealogy`,
  NODES: (id: string) => `${URL_GATEWAY}/api/trees/${id}/nodes`
}

export const NODE_RELATIONS = {
  SPOUSE: 'spouse',
  CHILDREN: 'children'
}
