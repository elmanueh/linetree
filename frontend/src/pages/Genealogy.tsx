import GenealogyAside from '@/components/GenealogyAside'
import GenealogyView from '@/components/GenealogyView'
import { useGenealogy } from '@/hooks/useGenealogy'

export default function Genealogy() {
  const { nodeId } = useGenealogy()

  return (
    <div className="flex">
      {nodeId && <GenealogyAside />}
      <main className="flex-1 bg-gray-200">
        <GenealogyView />
      </main>
    </div>
  )
}
