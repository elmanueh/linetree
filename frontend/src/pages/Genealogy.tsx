import GenealogyAside from '@/components/genealogy/GenealogyAside'
import GenealogyHeader from '@/components/genealogy/GenealogyHeader'
import GenealogyView from '@/components/genealogy/GenealogyView'
import { useGenealogy } from '@/hooks/useGenealogy'

export default function Genealogy() {
  const { nodeId } = useGenealogy()

  return (
    <>
      <GenealogyHeader />
      <main className="flex bg-gray-200">
        {nodeId && <GenealogyAside />}
        <div className={`flex-1 ${nodeId ? 'hidden sm:block' : ''}`}>
          <GenealogyView />
        </div>
      </main>
    </>
  )
}
