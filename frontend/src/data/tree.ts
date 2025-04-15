export const NODE_WIDTH = 150
export const NODE_HEIGHT = 60
export const PARTNER_SPACING = 30
export const CHILD_SPACING = 60
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

export const links: Relationship[] = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '2', target: '3' },

  { source: '1', target: '4' },
  { source: '2', target: '4' },
  { source: '1', target: '5' },
  { source: '2', target: '5' },

  { source: '1', target: '9' },
  { source: '2', target: '9' },

  { source: '4', target: '7' },
  { source: '9', target: '10' },

  // Hijo 2 y su pareja (4 y 7) tienen hijos: 11, 12, 15, 17
  { source: '4', target: '11' },
  { source: '7', target: '11' },
  { source: '4', target: '12' },
  { source: '7', target: '12' },
  { source: '4', target: '15' },
  { source: '7', target: '15' },
  { source: '4', target: '17' },
  { source: '7', target: '17' },

  // Hijo 4 y su pareja (9 y 10) tienen hijos: 13, 14, 16, 18
  { source: '9', target: '13' },
  { source: '10', target: '13' },
  { source: '9', target: '14' },
  { source: '10', target: '14' },
  { source: '9', target: '16' },
  { source: '10', target: '16' },
  { source: '9', target: '18' },
  { source: '10', target: '18' }
]

export const treeData: Node = {
  id: '1',
  label: 'Manue',
  children: [
    { id: '3', label: 'Hijo 1' },
    {
      id: '4',
      label: 'Hijo 2',
      partner: [
        {
          id: '7',
          label: 'Fabiana 2',
          children: [
            { id: '11', label: 'Nieto 1' },
            { id: '12', label: 'Nieto 2' },
            { id: '15', label: 'Nieto 3' },
            { id: '17', label: 'Nieto 4' }
          ]
        }
      ],
      children: [
        { id: '11', label: 'Nieto 1' },
        { id: '12', label: 'Nieto 2' },
        { id: '15', label: 'Nieto 3' },
        { id: '17', label: 'Nieto 4' }
      ]
    },
    { id: '5', label: 'Hijo 3' },
    {
      id: '9',
      label: 'Hijo 4',
      partner: [
        {
          id: '10',
          label: 'Fabiana 4',
          children: [
            { id: '13', label: 'Nieto 5' },
            { id: '14', label: 'Nieto 6' },
            { id: '16', label: 'Nieto 7' },
            { id: '18', label: 'Nieto 8' }
          ]
        }
      ],
      children: [
        { id: '13', label: 'Nieto 5' },
        { id: '14', label: 'Nieto 6' },
        { id: '16', label: 'Nieto 7' },
        { id: '18', label: 'Nieto 8' }
      ]
    }
  ],
  partner: [
    {
      id: '2',
      label: 'Perez',
      children: [
        { id: '3', label: 'Hijo 1' },
        {
          id: '4',
          label: 'Hijo 2',
          partner: [
            {
              id: '7',
              label: 'Fabiana 2',
              children: [
                { id: '11', label: 'Nieto 1' },
                { id: '12', label: 'Nieto 2' },
                { id: '15', label: 'Nieto 3' },
                { id: '17', label: 'Nieto 4' }
              ]
            }
          ],
          children: [
            { id: '11', label: 'Nieto 1' },
            { id: '12', label: 'Nieto 2' },
            { id: '15', label: 'Nieto 5' },
            { id: '17', label: 'Nieto 7' }
          ]
        },
        { id: '5', label: 'Hijo 3' },
        {
          id: '9',
          label: 'Hijo 4',
          partner: [
            {
              id: '10',
              label: 'Fabiana 4',
              children: [
                { id: '13', label: 'Nieto 3' },
                { id: '14', label: 'Nieto 4' },
                { id: '16', label: 'Nieto 6' },
                { id: '18', label: 'Nieto 8' }
              ]
            }
          ],
          children: [
            { id: '13', label: 'Nieto 3' },
            { id: '14', label: 'Nieto 4' },
            { id: '16', label: 'Nieto 6' },
            { id: '18', label: 'Nieto 8' }
          ]
        }
      ]
    }
  ]
}
