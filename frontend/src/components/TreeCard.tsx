import { API_URLS } from '@/configs/constants'
import { Tree } from '@/configs/types'
import { Link } from 'react-router'

interface TreeCardProps extends Tree {
  callback: (id: string) => void
  callback2: (id: string) => void
}

export default function TreeCard({
  id,
  name,
  callback,
  callback2
}: TreeCardProps) {
  const handleDeleteTree = async (event: React.MouseEvent) => {
    event.preventDefault()

    const response = await fetch(API_URLS.TREE(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      alert('Error al eliminar el árbol')
      return
    }
    callback(id)
  }

  return (
    <Link to={`/${id}`} onClick={() => callback2(id)}>
      <div className="card">
        <h3>{name}</h3>
        <p>{id}</p>
        <button onClick={handleDeleteTree}>Eliminar</button>
      </div>
    </Link>
  )
}
