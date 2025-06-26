import ImportTree from '@/components/ImportTree'
import Loading from '@/components/layout/Loading'
import SearchBarCreateTree from '@/components/SearchBarCreateTree'
import TreeCard from '@/components/TreeCard'
import { CreateTree } from '@/configs/api.types'
import { TreeReducerType, UUID } from '@/configs/types'
import { useTree } from '@/hooks/useTree'

export default function Home() {
  const { trees, loading, createTree, createTreeWithFile, deleteTree } =
    useTree(TreeReducerType.ALL)

  const handleCreateTree = async (name: string) => {
    try {
      if (!name.trim()) return
      const tree: CreateTree = { name }
      await createTree(tree)
    } catch (error) {
      alert('Error creating tree: ' + error)
    }
  }

  const handleDeleteTree = async (id: UUID) => {
    try {
      await deleteTree(id)
    } catch (error) {
      alert('Error deleting tree: ' + error)
    }
  }

  const handleFileUpload = async (fileData: string) => {
    try {
      if (!fileData) return
      await createTreeWithFile(fileData)
    } catch (error) {
      alert('Error importing tree: ' + error)
    }
  }

  return (
    <section className="mt-24">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-800">Genealogy Tree</h1>
        <p className="mt-2 text-lg ">
          Explora, crea y gestiona tus árboles genealógicos fácilmente.
        </p>
      </header>

      <SearchBarCreateTree callback={handleCreateTree} />
      <ImportTree callback={handleFileUpload} />

      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4">
          Mis árboles genealógicos
        </h2>
        {loading ? (
          <Loading />
        ) : trees.length === 0 ? (
          <p className="text-gray-500">No tienes árboles creados todavía.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trees.map((tree) => (
              <li key={tree.id}>
                <TreeCard tree={tree} callbackDelete={handleDeleteTree} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
