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

type FrameWindow = Window & {
  __gfPaused?: boolean
  __gfRaf?: typeof requestAnimationFrame
  __gfQueue?: FrameRequestCallback[]
}

const PAUSE_STYLE_ID = "gf-pause"

/**
 * Freezes a same-origin frame's animation without touching its file: its
 * requestAnimationFrame is swapped for one that only queues the callback, and its CSS
 * animations are paused by an injected rule. The frame's own state is untouched, so
 * `resumeFrame` simply hands the queued callbacks to the real rAF and the animation
 * carries on from where it stopped. (Zhengqi 2026-09-10: the four frames on the page
 * kept running after they had scrolled away — the AI hardware device alone was a
 * third of a core of GPU time, off screen, for as long as the tab lived.)
 */
const pauseFrame = (win: FrameWindow) => {
  if (win.__gfPaused) return
  const queue: FrameRequestCallback[] = []
  win.__gfRaf = win.requestAnimationFrame
  win.__gfQueue = queue
  win.requestAnimationFrame = cb => {
    queue.push(cb)
    return 0
  }
  win.__gfPaused = true
  const doc = win.document
  if (doc?.head && !doc.getElementById(PAUSE_STYLE_ID)) {
    const style = doc.createElement("style")
    style.id = PAUSE_STYLE_ID
    style.textContent = "*,*::before,*::after{animation-play-state:paused!important}"
    doc.head.appendChild(style)
  }
}

const resumeFrame = (win: FrameWindow) => {
  if (!win.__gfPaused) return
  const raf = win.__gfRaf
  const queue = win.__gfQueue ?? []
  if (raf) win.requestAnimationFrame = raf
  win.__gfPaused = false
  win.__gfQueue = undefined
  win.document?.getElementById(PAUSE_STYLE_ID)?.remove()
  queue.forEach(cb => win.requestAnimationFrame(cb))
}

/**
 * Hosts one of Glen's standalone animation files in a same-origin iframe.
 *
 * They are self-contained pages that size themselves to their own viewport and
 * drive everything from rAF, so an iframe reproduces them exactly and lets us
 * swap a file when he iterates instead of re-porting the animation. `?clean`
 * is his own flag for hiding the BG/REPLAY debug buttons.
 *
 * Nothing is loaded until the frame is close to the viewport, and once loaded it
 * only animates while part of it is on screen: each one runs a permanent
 * animation loop, and the page carries four of them.
 */
const GraphicFrame = ({ src, title, className = "", interactive = false }: GraphicFrameProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const nearRef = useRef(false)
  const [show, setShow] = useState(false)

  // apply the current on/off-screen state to the frame's window, if it has one yet
  const sync = () => {
    const win = frameRef.current?.contentWindow as FrameWindow | null | undefined
    if (!win) return
    try {
      if (nearRef.current) resumeFrame(win)
      else pauseFrame(win)
    } catch {
      // a cross-origin frame would throw here; ours are same-origin
    }
  }

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    // load early: 200px before the frame comes into view, so it is drawn by the time it shows
    const loader = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShow(true)
          loader.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    // but only animate while some of it is actually on screen — a frame whose bottom edge sits
    // 150px above the viewport was still burning a third of a core with the 200px margin
    const gate = new IntersectionObserver(entries => {
      nearRef.current = entries.some(e => e.isIntersecting)
      sync()
    })
    loader.observe(host)
    gate.observe(host)
    return () => {
      loader.disconnect()
      gate.disconnect()
    }
  }, [])

  return (
    <div ref={hostRef} className={className}>
      {show && (
        <iframe
          ref={frameRef}
          src={`/graphics/${src}?clean`}
          title={title}
          loading="lazy"
          scrolling="no"
          // the file may have scrolled away again while it was loading
          onLoad={sync}
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
