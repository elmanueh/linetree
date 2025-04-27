import TreeCard from '@/components/TreeCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [trees, setTrees] = useState([])

  const handleNewTree = async () => {
    const nombre = document.getElementById('arbol-nombre') as HTMLInputElement

    const response = await fetch('http://localhost:3000/api/trees', {
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

    const jsonLdData = await response.json()
    setTrees([...trees, { id: jsonLdData, name: nombre.value }])
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/trees')
      return response.json()
    }

    fetchData().then((jsonLdData) => {
      setTrees(jsonLdData.trees)
    })
  }, [])

  return (
    <div className="home">
      <h1>Genealogy Tree</h1>
      <button onClick={handleNewTree}>Nuevo</button>
      <input type="text" id="arbol-nombre" className="home-text"></input>
      <p>Seleccione uno de los siguientes arboles</p>
      <div className="tree-list">
        {trees.map((tree) => (
          <TreeCard treeId={tree.id} treeName={tree.name} key={tree.id} />
        ))}
      </div>
    </div>
  )
}
