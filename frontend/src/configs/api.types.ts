export interface GetTrees {
  trees: Array<Tree>
}

export interface Tree {
  id: string
  name: string
  nodes: string[]
}

export interface CreateTree {
  name: string
}
