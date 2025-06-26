import GenealogyAside from '@/components/GenealogyAside'
import GenealogyView from '@/components/GenealogyView'
import { TreeReducerType } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useTree } from '@/hooks/useTree'

export default function Genealogy() {
  const { nodeId, treeId } = useGenealogy()
  const { trees, loading } = useTree(TreeReducerType.BY_ID, treeId)

  if (loading) return
  const tree = trees[0]

  return (
    <>
      <div className="flex">
        {nodeId && <GenealogyAside />}
        <main className="flex-1 bg-gray-300">
          <div className="bg-gray-200 text-gray-700 px-4 py-2 flex justify-between border-gray-300 ">
            <div className="font-medium flex gap-10">
              <span>Árbol {tree.name}</span>
              <span>
                {tree.nodes.length}{' '}
                {tree.nodes.length === 1 ? 'persona' : 'personas'}
              </span>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Última edición:{' '}
              {new Intl.DateTimeFormat('es-ES', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }).format(new Date(tree?.updatedAt))}
            </span>
          </div>
          <GenealogyView />
        </main>
      </div>
    </>
  )
}
