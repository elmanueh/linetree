export const NODE_WIDTH = 150
export const NODE_HEIGHT = 60
export const PARTNER_SPACING = 30
export const CHILD_SPACING = 40
export const VERTICAL_SPACING = 150

export interface Node {
  id: string
  label: string
  children?: Node[]
  partner?: Node[]
  x?: number
  y?: number
  level?: number
}

export interface Relationship {
  source: string
  target: string
}

export const treeData: Node = {
  id: '1',
  label: 'Padre',
  partner: [
    {
      id: '2',
      label: 'Fabiana',
      children: [
        { id: '3', label: 'Hijo 1' },
        { id: '4', label: 'Hijo 2' },
        { id: '5', label: 'Hijo 3' }
      ]
    }
  ],
  children: [
    {
      id: '3',
      label: 'Hijo 1',
      partner: [
        {
          id: '6',
          label: 'Fabiana',
          children: [{ id: '7', label: 'Nieto 1' }]
        }
      ],
      children: [
        {
          id: '7',
          label: 'Nieto 1'
        }
      ]
    },
    {
      id: '4',
      label: 'Hijo 2',
      partner: []
    },
    {
      id: '5',
      label: 'Hijo 3',
      partner: [
        {
          id: '8',
          label: 'Fabiana',
          children: [
            { id: '9', label: 'Nieto 2' },
            { id: '10', label: 'Nieto 3' }
          ]
        }
      ],
      children: [
        {
          id: '9',
          label: 'Nieto 2'
        },
        {
          id: '10',
          label: 'Nieto 3'
        }
      ]
    }
  ]
}

export const links: Relationship[] = [
  // Padre y madre
  { source: '1', target: '2' },

  // Hijos
  { source: '1', target: '3' },
  { source: '2', target: '3' },
  { source: '1', target: '4' },
  { source: '2', target: '4' },
  { source: '1', target: '5' },
  { source: '2', target: '5' },

  // Hijo 1 y su pareja + nieto
  { source: '3', target: '6' },
  { source: '3', target: '7' },
  { source: '6', target: '7' },

  // Hijo 3 y su pareja + nietos
  { source: '5', target: '8' },
  { source: '5', target: '9' },
  { source: '8', target: '9' },
  { source: '5', target: '10' },
  { source: '8', target: '10' }
]
