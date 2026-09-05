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
      // clientWidth/Height include padding, and getBoundingClientRect includes it too —
      // measure the content box so a padded wrapper actually insets the children
      const cs = getComputedStyle(el)
      const available = {
        w: el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
        h: el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
      }
      if (available.w <= 0 || available.h <= 0) return
      setScale(Math.min(available.w / width, available.h / height))
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
