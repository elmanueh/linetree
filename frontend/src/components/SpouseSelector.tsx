import { UUID } from '@/configs/types'
import { useGenealogy } from '@/hooks/useGenealogy'

interface SpouseSelectorProps {
  formData: { spouseId?: UUID }
  callbackChange: (data: UUID) => void
}

export default function SpouseSelector({
  formData,
  callbackChange
}: SpouseSelectorProps) {
  const { nodeId, genealogy } = useGenealogy()

  const getSpouses = (): { id: UUID; givenName: string }[] => {
    const person = genealogy.find((p) => p['@id'] === nodeId)
    if (!person?.spouse) return []

    const spouseIds = Array.isArray(person.spouse)
      ? person.spouse.map((s) => s['@id'])
      : [person.spouse['@id']]

    return genealogy
      .filter((p) => spouseIds.includes(p['@id']))
      .map((p) => ({
        id: p['@id'],
        givenName: p.givenName
      }))
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Selecciona pareja <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2 flex-wrap">
        {getSpouses().map((spouse) => (
          <button
            key={spouse.id}
            type="button"
            onClick={() => callbackChange(spouse.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded border ${
              formData.spouseId === spouse.id
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-gray-300'
            } hover:bg-blue-50`}
          >
            {spouse.givenName || 'Sin nombre'}
          </button>
        ))}
      </div>
    </div>
  )
}
