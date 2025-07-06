import MoreTreeMenu from '@/components/menus/MoreTreeMenu'
import { Tree } from '@/configs/api.types'
import { NAV_ROUTES } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { Link } from 'react-router'

interface TreeCardProps {
  tree: Tree
  callbackDelete: (id: UUID) => void
}

export default function TreeCard({ tree, callbackDelete }: TreeCardProps) {
  const { handleSelectedTree } = useGenealogy()

  return (
    <div className="border bg-gray-50 border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-200">
      <Link
        to={NAV_ROUTES.TREE(tree.id)}
        onClick={() => handleSelectedTree(tree.id)}
        className="block"
      >
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
              {tree.name}
            </h3>
            <p className="text-sm text-gray-500">
              {tree.nodes.length} persona{tree.nodes.length !== 1 && 's'}
            </p>
          </div>
          <MoreTreeMenu
            id={tree.id}
            callbackDelete={(id: UUID) => callbackDelete(id)}
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-1 text-xs text-gray-400">
          <span>
            Creado:{' '}
            {new Intl.DateTimeFormat('es-ES', {
              dateStyle: 'medium',
              timeStyle: 'short'
            }).format(new Date(tree.createdAt))}
          </span>
          <span>
            Última edición:{' '}
            {new Intl.DateTimeFormat('es-ES', {
              dateStyle: 'medium',
              timeStyle: 'short'
            }).format(new Date(tree.updatedAt))}
          </span>
        </div>
      </Link>
    </div>
  )
}
