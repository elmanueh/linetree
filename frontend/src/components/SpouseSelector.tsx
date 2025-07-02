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

  const getSpouses = (): {
    id: UUID
    givenName: string
    familyName?: string
  }[] => {
    const person = genealogy.find((p) => p['@id'] === nodeId)
    if (!person?.spouse) return []

    const spouseIds = Array.isArray(person.spouse)
      ? person.spouse.map((s) => (s as { '@id': UUID })['@id'])
      : [(person.spouse as { '@id': UUID })['@id']]

    return genealogy
      .filter((p) => spouseIds.includes(p['@id'] as string))
      .map((p) => ({
        id: p['@id'] as UUID,
        givenName: p.givenName as string,
        familyName: p.familyName as string | undefined
      }))
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Cónyuge <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2 flex-wrap">
        {getSpouses().map((spouse) => (
          <button
            key={spouse.id}
            type="button"
            onClick={() => callbackChange(spouse.id)}
            className={`flex items-center gap-2 px-3 py-2 min-w-32 rounded border justify-center ${
              formData.spouseId === spouse.id
                ? 'bg-green-100 border-green-500'
                : 'bg-white border-gray-300'
            } hover:bg-green-50`}
          >
            <div>
              {spouse.givenName}{' '}
              {spouse.familyName ? spouse.familyName.slice(0, 3) + '.' : ''}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
