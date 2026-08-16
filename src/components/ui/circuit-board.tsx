"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CircuitNode {
  id: string
  x: number
  y: number
  label?: string
  icon?: React.ReactNode
  status?: "active" | "inactive" | "processing" | "error"
  size?: "sm" | "md" | "lg"
}

interface CircuitConnection {
  from: string
  to: string
  animated?: boolean
  bidirectional?: boolean
  color?: string
  pulseColor?: string
}

interface CircuitBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: CircuitNode[]
  connections: CircuitConnection[]
  width?: number
  height?: number
  gridSize?: number
  showGrid?: boolean
  gridColor?: string
  traceColor?: string
  pulseColor?: string
  nodeColor?: string
  pulseSpeed?: number
  traceWidth?: number
  /** Force a specific theme variant. Defaults to auto-detect from system. */
  variant?: "light" | "dark" | "auto"
}

function CircuitBoard({
  nodes,
  connections,
  width = 600,
  height = 400,
  gridSize = 20,
  showGrid = true,
  gridColor,
  traceColor,
  pulseColor,
  nodeColor,
  pulseSpeed = 2,
  traceWidth = 2,
  variant = "auto",
  className,
  ...props
}: CircuitBoardProps) {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    if (variant !== "auto") {
      setIsDark(variant === "dark")
      return
    }
    const checkTheme = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      setIsDark(isDarkMode)
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", checkTheme)
    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener("change", checkTheme)
    }
  }, [variant])

  // ADRIG-aware color defaults (light mode priority since site is light)
  const computedGridColor = gridColor || (isDark ? "rgba(169,200,255,0.10)" : "rgba(217,226,238,0.8)")
  const computedTraceColor = traceColor || (isDark ? "rgba(169,200,255,0.35)" : "rgba(169,200,255,0.6)")
  const computedPulseColor = pulseColor || (isDark ? "rgba(52,125,255,0.9)" : "rgba(20,99,255,0.95)")
  const computedNodeColor = nodeColor || (isDark ? "rgba(169,200,255,0.6)" : "rgba(20,99,255,0.7)")

  const nodeMap = React.useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]))
  }, [nodes])

  const getNodeSize = React.useCallback((size?: CircuitNode["size"]) => {
    switch (size) {
      case "sm": return 20
      case "lg": return 44
      default: return 32
    }
  }, [])

  const calculatePath = React.useCallback(
    (from: CircuitNode, to: CircuitNode): string => {
      const fromSize = getNodeSize(from.size) / 2 + 4
      const toSize = getNodeSize(to.size) / 2 + 4
      const dx = to.x - from.x
      const dy = to.y - from.y

      let startX = from.x
      let startY = from.y
      let endX = to.x
      let endY = to.y

      if (Math.abs(dx) > Math.abs(dy)) {
        startX = from.x + (dx > 0 ? fromSize : -fromSize)
        endX = to.x + (dx > 0 ? -toSize : toSize)
        const midX = from.x + dx / 2
        return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`
      } else {
        startY = from.y + (dy > 0 ? fromSize : -fromSize)
        endY = to.y + (dy > 0 ? -toSize : toSize)
        const midY = from.y + dy / 2
        return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`
      }
    },
    [getNodeSize]
  )

  const getStatusColor = (status?: CircuitNode["status"]) => {
    switch (status) {
      case "active": return "#1463FF"
      case "processing": return "#347DFF"
      case "error": return "#52627A"
      case "inactive": return "#D9E2EE"
      default: return computedNodeColor
    }
  }

  const getPathLength = (path: string): number => {
    if (typeof document === "undefined") return 300
    try {
      const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path")
      pathEl.setAttribute("d", path)
      svgEl.appendChild(pathEl)
      document.body.appendChild(svgEl)
      const length = pathEl.getTotalLength()
      document.body.removeChild(svgEl)
      return length
    } catch {
      return 300
    }
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
      {...props}
    >
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {showGrid && (
          <defs>
            <pattern
              id="circuit-grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={computedGridColor}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        )}
        {showGrid && (
          <rect width={width} height={height} fill="url(#circuit-grid)" />
        )}

        {/* Trace paths */}
        {connections.map((conn, idx) => {
          const fromNode = nodeMap.get(conn.from)
          const toNode = nodeMap.get(conn.to)
          if (!fromNode || !toNode) return null
          const path = calculatePath(fromNode, toNode)

          return (
            <g key={`conn-${idx}`}>
              {/* Static trace */}
              <path
                d={path}
                fill="none"
                stroke={conn.color || computedTraceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated pulse */}
              {conn.animated !== false && (
                <motion.circle
                  r={3}
                  fill={conn.pulseColor || computedPulseColor}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 0.4,
                  }}
                  style={{
                    offsetPath: `path("${path}")`,
                    offsetRotate: "0deg",
                  } as React.CSSProperties}
                />
              )}
              {conn.bidirectional && conn.animated !== false && (
                <motion.circle
                  r={3}
                  fill={conn.pulseColor || computedPulseColor}
                  initial={{ offsetDistance: "100%" }}
                  animate={{ offsetDistance: "0%" }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: idx * 0.4 + pulseSpeed / 2,
                  }}
                  style={{
                    offsetPath: `path("${path}")`,
                    offsetRotate: "0deg",
                  } as React.CSSProperties}
                />
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const size = getNodeSize(node.size)
          const half = size / 2
          const statusColor = getStatusColor(node.status)

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Glow for active nodes */}
              {node.status === "active" && (
                <motion.circle
                  r={half + 8}
                  fill={statusColor}
                  opacity={0.12}
                  animate={{ r: [half + 6, half + 14, half + 6], opacity: [0.12, 0.04, 0.12] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Node background */}
              <rect
                x={-half}
                y={-half}
                width={size}
                height={size}
                rx={node.size === "lg" ? 10 : 6}
                fill="white"
                stroke={statusColor}
                strokeWidth={node.status === "active" ? 2 : 1.5}
              />

              {/* Inner dot */}
              <circle
                cx={0}
                cy={0}
                r={node.size === "lg" ? 6 : node.size === "sm" ? 3 : 4.5}
                fill={statusColor}
                opacity={0.9}
              />

              {/* Icon */}
              {node.icon && (
                <foreignObject x={-half + 4} y={-half + 4} width={size - 8} height={size - 8}>
                  <div className="flex items-center justify-center w-full h-full text-[#1463FF]">
                    {node.icon}
                  </div>
                </foreignObject>
              )}

              {/* Label */}
              {node.label && (
                <text
                  y={half + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                  fill="#52627A"
                  letterSpacing="0.04em"
                >
                  {node.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export { CircuitBoard }
export type { CircuitBoardProps, CircuitNode, CircuitConnection }
