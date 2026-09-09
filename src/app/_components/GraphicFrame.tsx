"use client"

import { useEffect, useRef, useState } from "react"

interface GraphicFrameProps {
  /** file under /public/graphics, e.g. "landing-hero-desktop.html" */
  src: string
  title: string
  className?: string
  /** let the page inside take clicks — the AI hardware device opens up on click */
  interactive?: boolean
}

/**
 * Hosts one of Glen's standalone animation files in a same-origin iframe.
 *
 * They are self-contained pages that size themselves to their own viewport and
 * drive everything from rAF, so an iframe reproduces them exactly and lets us
 * swap a file when he iterates instead of re-porting the animation. `?clean`
 * is his own flag for hiding the BG/REPLAY debug buttons.
 *
 * Nothing is loaded until the frame is close to the viewport: each one runs a
 * permanent animation loop, and the page carries four of them.
 */
const GraphicFrame = ({ src, title, className = "", interactive = false }: GraphicFrameProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShow(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className={className}>
      {show && (
        <iframe
          src={`/graphics/${src}?clean`}
          title={title}
          loading="lazy"
          scrolling="no"
          // decorative unless interactive: the surrounding copy already says what it shows
          aria-hidden={!interactive}
          tabIndex={interactive ? 0 : -1}
          className={`size-full border-0 bg-transparent ${interactive ? "" : "pointer-events-none"}`}
        />
      )}
    </div>
  )
}

export default GraphicFrame
