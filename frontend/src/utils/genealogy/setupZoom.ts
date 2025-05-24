import * as d3 from 'd3'

export function setupZoom(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>
) {
  const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
    g.attr('transform', event.transform)
  })

  svg.call(zoom)
  return zoom
}
