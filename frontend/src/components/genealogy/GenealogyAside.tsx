import { InfoField } from '@/components/genealogy/InfoField'
import { InfoSection } from '@/components/genealogy/InfoSection'
import NodeInfoHeader from '@/components/genealogy/NodeInfoHeader'
import Loading from '@/components/layout/Loading'
import { NodeGenderType } from '@/configs/constants'
import { NodeReducerType } from '@/configs/types'
import { useNode } from '@/hooks/useNode'

export default function GenealogyAside() {
  const { nodes, loading } = useNode(NodeReducerType.BY_ID)

  if (!nodes) return null
  const node = nodes[0]

  const formatDate = (date?: string | null) =>
    date ? new Date(date).toLocaleDateString('es-ES') : null

  const relationMap = {
    [NodeGenderType.MALE]: 'Masculino',
    [NodeGenderType.FEMALE]: 'Femenino',
    [NodeGenderType.OTHER]: 'Otro'
  }

  if (loading) {
    return (
      <div className="h-auto w-90 px-6 bg-gray-200 flex justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <aside className="h-auto w-90 px-6 bg-gray-200 flex flex-col">
      <NodeInfoHeader />

      {(node.givenName ||
        node.familyName ||
        node.gender ||
        node.nationality) && (
        <InfoSection title="Información Personal">
          <InfoField label="Nombre" value={node.givenName} />
          <InfoField label="Apellido" value={node.familyName} />
          <InfoField label="Género" value={relationMap[node.gender]} />
          <InfoField label="Nacionalidad" value={node.nationality} />
        </InfoSection>
      )}

      {(node.birthDate ||
        node.birthPlace ||
        node.deathDate ||
        node.deathPlace) && (
        <InfoSection title="Fechas y Lugares">
          <InfoField
            label="Fecha de Nacimiento"
            value={formatDate(node.birthDate)}
          />
          <InfoField label="Lugar de Nacimiento" value={node.birthPlace} />
          <InfoField
            label="Fecha de Fallecimiento"
            value={formatDate(node.deathDate)}
          />
          <InfoField label="Lugar de Fallecimiento" value={node.deathPlace} />
        </InfoSection>
      )}

      {(node.email || node.telephone || node.address) && (
        <InfoSection title="Contacto">
          <InfoField label="Email" value={node.email} />
          <InfoField label="Teléfono" value={node.telephone} />
          <InfoField label="Dirección" value={node.address} />
        </InfoSection>
      )}
    </aside>
  )
}
