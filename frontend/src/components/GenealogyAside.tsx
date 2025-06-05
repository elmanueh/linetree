import Loading from '@/components/layout/Loading'
import NodeInfoHeader from '@/components/NodeInfoHeader'
import { NodeReducerType } from '@/configs/types'
import { useNode } from '@/hooks/useNode'

interface GenealogyAsideProps {
  callback: () => void
}

export default function GenealogyAside({ callback }: GenealogyAsideProps) {
  const { nodes, loading } = useNode(NodeReducerType.BY_ID)

  if (loading) return <Loading />
  if (!nodes) return null
  const node = nodes[0]

  return (
    <aside className="h-full w-80 border-r border-gray-200 p-4 shadow-md">
      <NodeInfoHeader callbackUpdate={callback} />
      <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
        <section className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Información
          </h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-600">Nombre:</p>
              <span>{node.givenName || 'No disponible'}</span>
            </div>

            <div>
              <p className="font-medium text-gray-600">Apellido:</p>
              <span>{node.familyName || 'No disponible'}</span>
            </div>

            <div>
              <p className="font-medium text-gray-600">Fecha de Nacimiento:</p>
              <span>
                {node.birthDate
                  ? new Date(node.birthDate).toLocaleDateString()
                  : 'No disponible'}
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-600">Género:</p>
              <span>{node.gender || 'No disponible'}</span>
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}
