import NodeInfo from '@/components/NodeInfo'
import { CreateNode, UpdateNode } from '@/configs/api.types'
import { NODE_RELATIONS } from '@/configs/constants'
import { GenealogyContext } from '@/context/GenealogyContext'
import { useNode } from '@/hooks/useNode'
import { useContext } from 'react'

interface GenealogyAsideProps {
  callback: () => void
}

export default function GenealogyAside({ callback }: GenealogyAsideProps) {
  const { nodeId } = useContext(GenealogyContext)
  const { loading, createNode, deleteNode, updateNode } = useNode(null)

  const handleAddNode = async (relation: string) => {
    const node: CreateNode = {
      nodeId,
      relation,
      nodeInfo: {
        name: 'Amadeo',
        firstName: 'Amadeo',
        lastName: 'Amadeo',
        birthDate: new Date('2023-10-10'),
        deathDate: new Date('2023-10-11'),
        gender: 'male'
      }
    }

    try {
      await createNode(node)
      callback()
    } catch (error) {
      alert('Error creating node:' + error)
    }
  }

  const handleRemoveNode = async () => {
    try {
      await deleteNode(nodeId)
      callback()
    } catch (error) {
      alert('Error deleting node: ' + error)
    }
  }

  const handleUpdateNode = async (node: UpdateNode) => {
    try {
      await updateNode(nodeId, node)
      callback()
    } catch (error) {
      alert('Error updating node: ' + error)
    }
  }

  return (
    <aside className="h-full w-80 border-r border-gray-200 p-4 shadow-md">
      {nodeId && (
        <>
          <div className="space-y-3 mb-6">
            <h2 className="text-lg font-semibold">Acciones</h2>
            <button
              disabled={loading}
              onClick={() => handleAddNode(NODE_RELATIONS.CHILDREN)}
              className="w-full py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            >
              {loading ? 'Añadiendo...' : 'Añadir hijo'}
            </button>

            <button
              disabled={loading}
              onClick={() => handleAddNode(NODE_RELATIONS.SPOUSE)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Añadiendo...' : 'Añadir pareja'}
            </button>

            <button
              onClick={handleRemoveNode}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
            >
              Eliminar nodo
            </button>
          </div>

          <div className="mt-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Información del nodo
            </h2>
            <p className="text-sm text-gray-500 mb-2 truncate">ID: {nodeId}</p>
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <NodeInfo callbackUpdate={handleUpdateNode} />
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
