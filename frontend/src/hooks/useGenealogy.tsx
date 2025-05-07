import { API_URLS } from '@/configs/constants'
import { parseGenealogy } from '@/utils/genealogy'
import { NodeObject } from 'jsonld'

interface GenealogyHookProps {
  treeId: string
}

export function useGenealogy({ treeId }: GenealogyHookProps) {
  const fetchGenealogy = async (): Promise<NodeObject> => {
    console.log('Fetching genealogy data...', treeId)
    const response = await fetch(API_URLS.GENEALOGY(treeId))
    if (!response.ok) {
      throw new Error('Error fetching genealogy data')
    }
    return response.json()
  }

  const handleGenealogy = async () => {
    try {
      const jsonld = await fetchGenealogy()
      const data = Array.isArray(jsonld['@graph']) ? jsonld['@graph'] : [jsonld]
      const { root, relations } = parseGenealogy(data)

      return { root, relations }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { handleGenealogy }
}
