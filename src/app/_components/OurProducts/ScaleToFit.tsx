"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

interface ScaleToFitProps {
  /** intrinsic size the children are authored at */
  width: number
  height: number
  className?: string
  children: ReactNode
}

/**
 * Renders children at their design size and scales the whole block to fit the box.
 * Glen: "elements get thinner and smaller when changing view ports" — the panels shrink
 * rather than reflow.
 */
const ScaleToFit = ({ width, height, className = "", children }: ScaleToFitProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      setScale(Math.min(rect.width / width, rect.height / height))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [width, height])

  return (
    <div ref={ref} className={`flex items-center justify-center overflow-hidden ${className}`}>
      <div
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: "center", visibility: scale ? "visible" : "hidden" }}
        className="shrink-0"
      >
        {children}
      </div>
    </div>
  )
}

export default ScaleToFit
