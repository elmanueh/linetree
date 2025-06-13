import { TreeService } from '@/services/tree.service'
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    await TreeService.importGedcom(text)
  }

  return (
    <>
      <section className="max-w-3xl mx-auto shadow-md rounded-lg p-6">
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
            className="flex-1 px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={handleCreateTree}
            className="px-4 bg-green-700 text-white font-medium rounded-md ml-5 cursor-pointer"
          >
            +
          </button>
        </div>
      </section>

      <div className="flex justify-center my-5">
        <div className="flex items-center w-full max-w-xl">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-5 text-gray-500 italic whitespace-nowrap">
            o impórtalo con GEDCOM
          </span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
      </div>

      <div className="flex justify-center">
        <label
          htmlFor="gedcom-upload"
          className="cursor-pointer px-4 py-3 bg-green-700 text-white font-medium rounded-md"
        >
          Seleccionar archivo
        </label>
        <input
          id="gedcom-upload"
          type="file"
          accept=".ged"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </>
  )
}
