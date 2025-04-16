// GenealogyTree.tsx
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import createCustomLayout from '../data/layout'
import {
  links,
  Node,
  NODE_HEIGHT,
  NODE_WIDTH,
  Relationship,
  treeData
} from '../data/tree'

export default function GenealogyTree() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Limpiar cualquier contenido previo

    svg.attr('width', '100%').attr('height', '1000px')

    // Crear el layout personalizado
    const nodes = createCustomLayout(treeData)

    // Crear el grupo para los elementos
    const g = svg.append('g')
    // Dibujar los enlaces (líneas) entre los nodos
    const link = g
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#999')
      .attr('stroke-width', 4)
      .attr('d', (d: Relationship) => {
        const sourceNode = nodes.find((n: Node) => n.id === d.source)
        const targetNode = nodes.find((n: Node) => n.id === d.target)
        if (!sourceNode || !targetNode) return
        if (!sourceNode.x || !sourceNode.y) return
        if (!targetNode.x || !targetNode.y) return

        // Connection between siblings
        if (sourceNode.level === targetNode.level) {
          return `M${sourceNode.x + NODE_WIDTH / 2},${
            sourceNode.y + NODE_HEIGHT / 2
          } H${targetNode.x + NODE_WIDTH / 2}`
        }

        // Connection between parent and child
        if (sourceNode.level === targetNode.level - 1) {
          const parents = nodes.filter(
            (n) =>
              n.level === sourceNode.level &&
              links.some((l) => l.source === n.id && l.target === targetNode.id)
          )

          const midX = (parents[0].x + parents[1].x + NODE_WIDTH) / 2
          const verticalStart = parents[0].y + NODE_HEIGHT / 2
          const verticalStop = verticalStart + 80
          const childX = targetNode.x + NODE_WIDTH / 2

          return `M${midX},${verticalStart}
              V${verticalStop}
              H${childX}
              V${targetNode.y}`
        }
      })

    // Dibujar los nodos
    const node = g
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: Node) => `translate(${d.x},${d.y})`)

    // Dibujar los rectángulos (nodos)
    node
      .append('rect')
      .attr('width', NODE_WIDTH) // Más ancho para incluir foto
      .attr('height', NODE_HEIGHT) // Más alto
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#fff')
      .attr('stroke', (d: Node) =>
        d.label.includes('Fabiana') || d.label.includes('Perez')
          ? '#fc8181'
          : '#17b4ce'
      )
      .attr('stroke-width', 2)

    node
      .append('image')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 40)
      .attr('height', 40)
      .attr('href', (d: Node) =>
        d.label.includes('Fabiana') || d.label.includes('Perez')
          ? 'https://cf.mhcache.com/FP/Assets/Images/Silhouette/SVG/silhouette-woman.svg'
          : 'https://cf.mhcache.com/FP/Assets/Images/Silhouette/SVG/silhouette-man.svg'
      )

    // Añadir texto dentro de los nodos
    node
      .append('text')
      .attr('x', 60)
      .attr('y', 35)
      .text((d: Node) => d.label)
      .attr('font-size', '14px')
      .attr('fill', '#333')

    svg.call(
      d3.zoom().on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    )

    return () => {}
  }, [])

  return (
    <div className="tree">
      <svg ref={svgRef} />
    </div>
  )
}
