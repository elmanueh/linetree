import MoreTreeMenu from '@/components/menus/MoreTreeMenu'
import { NAV_ROUTES } from '@/configs/constants'
import { UUID } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'
import { Link } from 'react-router'

interface TreeCardProps {
  id: UUID
  name: string
  nodeCount: number
  callbackDelete: (id: UUID) => void
}

export default function TreeCard({
  id,
  name,
  nodeCount,
  callbackDelete
}: TreeCardProps) {
  const { handleSelectedTree } = useGenealogy()

  return (
    <div className="relative border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow duration-200">
      <Link
        to={NAV_ROUTES.TREE(id)}
        onClick={() => handleSelectedTree(id)}
        className="block"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-500">
              {nodeCount} persona{nodeCount !== 1 && 's'}
            </p>
          </div>
          <MoreTreeMenu
            id={id}
            callbackDelete={(id: UUID) => callbackDelete(id)}
          />
        </div>
      </Link>
    </div>
  )
}
