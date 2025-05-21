import NodeInfo from '@/components/NodeInfo'
import { NODE_RELATIONS } from '@/configs/constants'
import { TreeContext } from '@/context/TreeContext'
import { useAddNode } from '@/hooks/useAddNode'
import { useGetNode } from '@/hooks/useGetNode'
import { useRemoveNode } from '@/hooks/useRemoveNode'
import { useContext } from 'react'
import { Link } from 'react-router'

interface GenealogyAsideProps {
  callback: () => void
}

export default function GenealogyAside({ callback }: GenealogyAsideProps) {
  const { treeId, selectedNodeId } = useContext(TreeContext)
  const { addNode, loading } = useAddNode({ treeId })
  const { removeNode } = useRemoveNode({ treeId })
  const { node } = useGetNode()

  const handleAddNode = async (relation: string) => {
    await addNode(selectedNodeId, relation, {
      name: 'Amadeo',
      firstName: 'Amadeo',
      lastName: 'Amadeo',
      birthDate: new Date('2023-10-10'),
      deathDate: new Date('2023-10-11'),
      gender: 'male'
    })

    callback()
  }

  const handleRemoveNode = async () => {
    await removeNode(selectedNodeId)
    callback()
  }

  return (
    <aside className="aside">
      <Link to="/" className="aside-link">
        Volver
      </Link>
      <h2 className="aside-title">Genealogy Tree</h2>
      {selectedNodeId && (
        <>
          <button
            disabled={loading}
            onClick={() => handleAddNode(NODE_RELATIONS.CHILDREN)}
          >
            {loading ? 'Añadiendo...' : 'Añadir hijo'}
          </button>
          <button
            disabled={loading}
            onClick={() => handleAddNode(NODE_RELATIONS.SPOUSE)}
          >
            {loading ? 'Añadiendo...' : 'Añadir pareja'}
          </button>
          <h3>Información nodo</h3>

          <p className="aside-paragraph">{selectedNodeId}</p>
          <NodeInfo node={node} treeId={treeId} callback={callback} />
          <button onClick={handleRemoveNode}>Eliminar Nodo</button>
        </>
      )}
    </aside>
  )
}
