import { Link } from 'react-router'
import './aside.css'

export default function GenealogyAside({ nodeSelected, treeId, callback }) {
  const handlePareja = async () => {
    const response = await fetch(
      `http://localhost:3000/api/trees/${treeId}/nodes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nodeId: nodeSelected,
          relation: 'spouse',
          nodeInfo: {
            name: 'Amadeo',
            firstName: 'prueba2',
            lastName: 'prueba3'
          }
        })
      }
    )

    if (!response.ok) {
      alert('Error al añadir pareja')
      return
    }

    callback()
  }

  const handleHijo = async () => {
    const response = await fetch(
      `http://localhost:3000/api/trees/${treeId}/nodes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nodeId: nodeSelected,
          relation: 'children',
          nodeInfo: {
            name: 'Amadeo',
            firstName: 'prueba2',
            lastName: 'prueba3'
          }
        })
      }
    )

    if (!response.ok) {
      alert('Error al añadir hijo')
      return
    }

    callback()
  }

  return (
    <aside className="aside">
      <Link to="/" className="aside-link">
        Volver
      </Link>
      <h2 className="aside-title">Genealogy Tree</h2>
      <p className="aside-paragraph">Nodo Seleccionado: {nodeSelected}</p>

      <button onClick={handlePareja}>Añadir Pareja</button>
      <button onClick={handleHijo}>Añadir Hijo</button>
    </aside>
  )
}
