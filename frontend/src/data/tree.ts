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
  label: 'Manuel',
  partner: [
    {
      id: '2',
      label: 'Fabiana 1',
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
          label: 'Fabiana 2',
          children: [
            { id: '9', label: 'Nieto 1' },
            { id: '10', label: 'Nieto 2' },
            { id: '37', label: 'Nieto 6' }
          ]
        }
      ],
      children: [
        {
          id: '9',
          label: 'Nieto 1',
          partner: [
            {
              id: '14',
              label: 'Fabiana 5',
              children: [
                { id: '17', label: 'Bisnieto 1' },
                { id: '38', label: 'Bisnieto 5' }
              ]
            }
          ],
          children: [
            { id: '17', label: 'Bisnieto 1' },
            { id: '38', label: 'Bisnieto 5' }
          ]
        },
        {
          id: '10',
          label: 'Nieto 2',
          partner: [
            {
              id: '15',
              label: 'Fabiana 6',
              children: [
                { id: '18', label: 'Bisnieto 2' },
                { id: '19', label: 'Bisnieto 3' },
                { id: '39', label: 'Bisnieto 6' }
              ]
            }
          ],
          children: [
            { id: '18', label: 'Bisnieto 2' },
            { id: '19', label: 'Bisnieto 3' },
            { id: '39', label: 'Bisnieto 6' }
          ]
        },
        {
          id: '37',
          label: 'Nieto 6',
          partner: [
            {
              id: '40',
              label: 'Fabiana 13',
              children: [{ id: '41', label: 'Bisnieto 7' }]
            }
          ],
          children: [{ id: '41', label: 'Bisnieto 7' }]
        }
      ]
    },
    {
      id: '4',
      label: 'Hijo 2',
      partner: [
        {
          id: '7',
          label: 'Fabiana 3',
          children: [
            {
              id: '11',
              label: 'Nieto 3',
              partner: [
                {
                  id: '16',
                  label: 'Fabiana 7',
                  children: [
                    { id: '20', label: 'Bisnieto 4' },
                    { id: '42', label: 'Bisnieto 8' }
                  ]
                }
              ],
              children: [
                { id: '20', label: 'Bisnieto 4' },
                { id: '42', label: 'Bisnieto 8' }
              ]
            }
          ]
        }
      ],
      children: [
        {
          id: '11',
          label: 'Nieto 3',
          partner: [
            {
              id: '16',
              label: 'Fabiana 7',
              children: [
                { id: '20', label: 'Bisnieto 4' },
                { id: '42', label: 'Bisnieto 8' }
              ]
            }
          ],
          children: [
            { id: '20', label: 'Bisnieto 4' },
            { id: '42', label: 'Bisnieto 8' }
          ]
        }
      ]
    },
    {
      id: '5',
      label: 'Hijo 3',
      partner: [
        {
          id: '8',
          label: 'Fabiana 4',
          children: [
            { id: '12', label: 'Nieto 4' },
            { id: '13', label: 'Nieto 5' }
          ]
        }
      ],
      children: [
        {
          id: '12',
          label: 'Nieto 4',
          partner: [],
          children: []
        },
        {
          id: '13',
          label: 'Nieto 5',
          partner: [],
          children: []
        }
      ]
    }
  ]
}
export const links: Relationship[] = [
  { source: '1', target: '2' },

  // Hijos
  { source: '1', target: '3' },
  { source: '2', target: '3' },
  { source: '1', target: '4' },
  { source: '2', target: '4' },
  { source: '1', target: '5' },
  { source: '2', target: '5' },

  // Hijo 1 y pareja
  { source: '3', target: '6' },

  // Nietos (Hijo 1)
  { source: '3', target: '9' },
  { source: '6', target: '9' },
  { source: '3', target: '10' },
  { source: '6', target: '10' },
  { source: '3', target: '37' },
  { source: '6', target: '37' },

  // Bisnietos (Nieto 1)
  { source: '9', target: '14' },
  { source: '9', target: '17' },
  { source: '14', target: '17' },
  { source: '9', target: '38' },
  { source: '14', target: '38' },

  // Bisnietos (Nieto 2)
  { source: '10', target: '15' },
  { source: '10', target: '18' },
  { source: '15', target: '18' },
  { source: '10', target: '19' },
  { source: '15', target: '19' },
  { source: '10', target: '39' },
  { source: '15', target: '39' },

  // Nieto 6
  { source: '37', target: '40' },
  { source: '37', target: '41' },
  { source: '40', target: '41' },

  // Hijo 2
  { source: '4', target: '7' },
  { source: '4', target: '11' },
  { source: '7', target: '11' },

  // Nieto 3
  { source: '11', target: '16' },
  { source: '11', target: '20' },
  { source: '16', target: '20' },
  { source: '11', target: '42' },
  { source: '16', target: '42' },

  // Hijo 3
  { source: '5', target: '8' },
  { source: '5', target: '12' },
  { source: '8', target: '12' },
  { source: '5', target: '13' },
  { source: '8', target: '13' }
]
