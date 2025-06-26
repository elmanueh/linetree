import { useState } from 'react'

interface SearchBarCreateTreeProps {
  callback: (name: string) => void
}

export default function SearchBarCreateTree({
  callback
}: SearchBarCreateTreeProps) {
  const [name, setName] = useState('')

  const handleCreateTree = async () => {
    callback(name)
    setName('')
  }

  return (
    <section className="max-w-3xl mx-auto shadow-md rounded-lg p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Crear nuevo árbol</h2>
      <div className="flex">
        <label htmlFor="tree-name" className="sr-only">
          Nombre del árbol
        </label>
        <input
          id="tree-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Introduce un nombre..."
          className="flex-1 px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleCreateTree}
          className="px-4 bg-green-600 hover:bg-green-700 transition text-white font-medium rounded-md ml-5 cursor-pointer"
        >
          +
        </button>
      </div>
    </section>
  )
}
