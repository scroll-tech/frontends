"use client"

import { CSSProperties, useEffect, useRef } from "react"

import styles from "./footer.module.css"

// the hill's profile across the eleven columns, and how far each is dropped
const PROFILE = [0, 0.34, 0.6, 0.8, 0.93, 1, 0.93, 0.8, 0.6, 0.34, 0]
// six violets, darkest first — stacked bottom to top
const STACK = ["#1C1046", "#2E1B70", "#4527AE", "#6D45E8", "#9A80F0", "#C6B9F8"]

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

/**
 * Glen's `footerBands` (scroll.html, 2026-09-10), his comment: "footer ridge, violet, hard
 * to trigger". The ridge stays hidden below the footer until the page is in its last
 * stretch — the window from 2.2 screens above the footer to the end of the document —
 * and rises through the last fifth of that, eased in, to show 78% of itself at the very
 * bottom. One transform on one element per frame; the blur is on the layer, not
 * recomputed.
 */
const FooterRidge = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const footer = el.closest("footer")
    if (!footer) return

    let ticking = false
    const update = () => {
      ticking = false
      const vh = window.innerHeight
      const maxScroll = Math.max(document.documentElement.scrollHeight - vh, 1)
      const footerTop = footer.getBoundingClientRect().top + window.scrollY
      const start = Math.max(footerTop - vh * 2.2, 0)
      const raw = clamp((window.scrollY - start) / Math.max(maxScroll - start, 1), 0, 1)
      const pulled = clamp((raw - 0.8) / 0.2, 0, 1)
      const eased = Math.pow(pulled, 2.2)
      el.style.transform = `translate3d(0, ${(100 - eased * 78).toFixed(2)}%, 0)`
    }
    const schedule = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <div ref={ref} className={styles.bands} aria-hidden="true">
      {PROFILE.map((p, i) => (
        <span key={i} className={styles.col} style={{ "--drop": `${((1 - p) * 58).toFixed(1)}%` } as CSSProperties}>
          {[...STACK].reverse().map(color => (
            <span key={color} style={{ background: color }} />
          ))}
        </span>
      ))}
    </div>
  )
}

export default FooterRidge
