import GenealogyAside from '@/components/genealogy/GenealogyAside'
import GenealogyView from '@/components/genealogy/GenealogyView'
import { TreeReducerType } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useTree } from '@/hooks/useTree'

export default function Genealogy() {
  const { nodeId } = useGenealogy()
  const { trees, loading } = useTree(TreeReducerType.BY_ID)

  if (loading) return
  const tree = trees[0]

  return (
    <>
      <div className="bg-gray-200 text-gray-700 px-4 sm:px-7 py-2 flex justify-between border-gray-300 flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row font-medium sm:gap-8">
          <span>{tree.name}</span>
          <span>
            {tree.nodes.length}{' '}
            {tree.nodes.length === 1 ? 'persona' : 'personas'}
          </span>
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap flex items-center">
          Última edición:{' '}
          {new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(new Date(tree?.updatedAt))}
        </span>
      </div>
      <div className="flex">
        <main
          className="flex flex-1 bg-gray-200"
          style={{ maxHeight: 'calc(100vh - 13vh)' }}
        >
          {nodeId && <GenealogyAside />}
          <GenealogyView />
        </main>
      </div>
    </>
  )
}
