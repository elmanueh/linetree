import { API_URLS, NODE_RELATIONS } from '@/configs/constants'
import { Link } from 'react-router'
import './aside.css'

interface GenealogyAsideProps {
  node: string
  treeId: string
  callback: () => void
}

export default function GenealogyAside({
  node,
  treeId,
  callback
}: GenealogyAsideProps) {
  const handleSpouse = async () => {
    const response = await fetch(API_URLS.NODES(treeId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nodeId: node,
        relation: NODE_RELATIONS.SPOUSE,
        nodeInfo: {
          name: 'Amadeo',
          firstName: 'prueba2',
          lastName: 'prueba3'
        }
      })
    })

    if (!response.ok) {
      alert('Error al añadir pareja')
      return
    }

    callback()
  }

  const handleChildren = async () => {
    const response = await fetch(API_URLS.NODES(treeId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nodeId: node,
        relation: NODE_RELATIONS.CHILDREN,
        nodeInfo: {
          name: 'Amadeo',
          firstName: 'prueba2',
          lastName: 'prueba3'
        }
      })
    })

    if (!response.ok) {
      alert('Error al añadir hijo')
      return
    }

    callback()
  }

  const handleDelete = async () => {
    const response = await fetch(API_URLS.NODE(treeId, node), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      alert('Error al eliminar nodo')
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
      <p className="aside-paragraph">Nodo Seleccionado: {node}</p>

      <button onClick={handleSpouse}>Añadir Pareja</button>
      <button onClick={handleChildren}>Añadir Hijo</button>
      <hr style={{ width: '100%' }} />
      <button onClick={handleDelete}>Eliminar Nodo</button>
    </aside>
  )
}
