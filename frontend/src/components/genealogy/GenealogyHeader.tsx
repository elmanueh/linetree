import { TreeReducerType } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { useTree } from '@/hooks/useTree'
import { useEffect } from 'react'

export default function GenealogyHeader() {
  const { trees, loading, refresh } = useTree(TreeReducerType.BY_ID)
  const { genealogy } = useGenealogy()

  useEffect(() => {
    refresh()
  }, [genealogy, refresh])

  if (loading) return null
  const tree = trees[0]

  return (
    <div className="bg-gray-200 text-gray-700 px-4 sm:px-7 py-2 flex justify-between border-gray-300 flex-col sm:flex-row font-medium sm:gap-8">
      <span className="whitespace-nowrap">{tree.name}</span>
      <div className="flex items-center justify-between w-full">
        <span>
          {tree.nodes.length} {tree.nodes.length === 1 ? 'persona' : 'personas'}
        </span>
        <span className="text-sm text-gray-500 whitespace-nowrap flex items-center">
          Última edición:{' '}
          {new Intl.DateTimeFormat('es-ES', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(new Date(tree?.updatedAt))}
        </span>
      </div>
    </div>
  )
}
