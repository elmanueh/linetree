import TreeCard from '@/components/TreeCard'
import { API_URLS } from '@/configs/constants'
import { Tree } from '@/configs/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [trees, setTrees] = useState<Tree[]>([])

  const handleNewTree = async () => {
    const nombre = document.getElementById('arbol-nombre') as HTMLInputElement

    const response = await fetch(API_URLS.TREES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nombre.value
      })
    })

    if (!response.ok) {
      alert('Error al crear el árbol')
      return
    }

    const treeId = await response.text()
    setTrees([...trees, { id: treeId, name: nombre.value }])
  }

  const handleDeleteTree = async (id: string) => {
    setTrees(trees.filter((tree) => tree.id !== id))
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URLS.TREES)
      return response.json()
    }

    fetchData().then((response) => {
      setTrees(response.trees)
    })
  }, [])

  return (
    <div className="home">
      <h1>Genealogy Tree</h1>
      <button onClick={handleNewTree}>Nuevo</button>
      <input type="text" id="arbol-nombre" className="home-text"></input>
      <p>Seleccione uno de los siguientes arboles</p>
      <div className="tree-list">
        <ul>
          {trees.map((tree) => (
            <li key={tree.id}>
              <TreeCard
                id={tree.id}
                name={tree.name}
                callback={handleDeleteTree}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
