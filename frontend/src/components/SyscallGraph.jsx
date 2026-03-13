import { useEffect, useRef } from "react"
import * as d3 from "d3"

function SyscallGraph({ nodes, edges }) {

  const svgRef = useRef()

  useEffect(() => {

    if (!nodes || nodes.length === 0) return

    const width = window.innerWidth * 0.65
    const height = window.innerHeight * 0.75

    const svg = d3.select(svgRef.current)

    svg.selectAll("*").remove()

    svg.attr("width", width)
       .attr("height", height)

    const g = svg.append("g")

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = g.append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2)

    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 25)
      .attr("fill", "#22c55e")

    const label = g.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "black")
      .style("font-size", "12px")

    simulation.on("tick", () => {

      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y)

    })

  }, [nodes, edges])

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "100%"
      }}
    />
  )
}

export default SyscallGraph