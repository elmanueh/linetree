import { Link } from 'react-router'
import './card.css'

export default function TreeCard({ treeId, treeName }) {
  const handleDeleteTree = async () => {
    const response = await fetch(`http://localhost:3000/api/trees/${treeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      alert('Error al eliminar el árbol')
      return
    }

    window.location.reload()
  }

  return (
    <Link to={`/${treeId}`}>
      <div className="card">
        <h3>{treeName}</h3>
        <p>{treeId}</p>
        <button onClick={handleDeleteTree}>Eliminar</button>
      </div>
    </Link>
  )
}
