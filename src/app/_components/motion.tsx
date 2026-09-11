"use client"

import { CSSProperties, Fragment, ReactNode, useEffect, useRef, useState } from "react"

import styles from "./motion.module.css"

/**
 * Glen's scroll.html (2026-09-10) replaces the monad-derived entrances this file used to
 * hold (a 30px / 0.8s power2.out rise, fired once) with one recipe for everything that
 * moves on scroll — see motion.module.css for the values. What survives from the earlier
 * rounds is the nav's drop-in, which his file does not animate but Zhengqi asked for.
 */

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * The nav dropping in from above, on load — monad's `.navbar` step, read off their page:
 *
 *   .navbar { transform: translateY(-100px); opacity: 0 }          // in CSS
 *   tl.to('.navbar', { y: 0, opacity: 1, duration: 1, ease: 'quart.out' }, 0)
 *
 * Happens once, on arrival, and settles to transform:none so the sticky bar is untouched
 * afterwards.
 */
const EASE_QUART = "cubic-bezier(0.165, 0.84, 0.44, 1)"

export const DropIn = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(true)
      return
    }
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return (
    <div
      className={className}
      style={{
        transition: `opacity 1s ${EASE_QUART}, transform 1s ${EASE_QUART}`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(-100px)",
      }}
    >
      {children}
    </div>
  )
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** ms before the entrance starts — Glen staggers the hero at 120 / 320 / 420 */
  delay?: number
  /** the panel variant: slides in from the right and never blurs */
  plain?: boolean
  /** play once, the first time the element is seen, and never hide it again — for the hero,
   *  where a replay on scrolling back up reads as the page refreshing */
  once?: boolean
}

/**
 * Glen's `.reveal`: an element fades in from a blur and a short rise as it comes into
 * view, and blurs out again as it leaves — his observer toggles the class in both
 * directions rather than firing once. Thresholds are his: 10% visible, with the top 4%
 * and bottom 8% of the viewport not counting, so nothing flickers at the very edge.
 *
 * The element keeps its layout box throughout — only transform, filter and opacity
 * move — so nothing below it shifts and the sticky product rail is unaffected.
 *
 * Rendered server-side hidden (the class carries opacity 0) so there is no flash before
 * hydration; the observer's first callback shows whatever is already on screen.
 */
export const Reveal = ({ children, className = "", delay = 0, plain = false, once = false }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setOn(true)
      return
    }
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (once) {
            if (!e.isIntersecting) return
            setOn(true)
            observer.disconnect()
          } else {
            setOn(e.isIntersecting)
          }
        }),
      { threshold: 0.1, rootMargin: "-4% 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${plain ? styles.plain : ""} ${on ? styles.in : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

/**
 * The headline's entrance: each word rises out of its own clipped line and sharpens as it
 * comes, the words 60ms apart, once, on load. This is the reveal Linear, Vercel and Apple's
 * marketing pages use for a large serif or display line, and it replaces two motions Glen's
 * file stacked on the same headline — a blur-in and, a second later, an "ascii pass" that
 * scrambled "frontier models" into symbols. Zhengqi 2026-09-10: the pair read as the line
 * refreshing twice, and the scramble, in a proportional serif, made the letters jump
 * sideways as symbol widths changed. Gone; one calm entrance, and nothing ever replays.
 *
 * Each word's clip box is padded and pulled back with negative margins so it covers the
 * serif's ascenders, descenders and the overhang of an "f" without adding to the layout.
 * Words are inline blocks separated by real spaces, so the line still wraps and balances.
 */
export const WordsIn = ({ text, delay = 120, stagger = 60 }: { text: string; delay?: number; stagger?: number }) => {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setOn(true)
      return
    }
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const words = text.split(" ")
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={styles.wordMask}>
            <span className={`${styles.word} ${on ? styles.wordIn : ""}`} style={{ "--d": `${delay + i * stagger}ms` } as CSSProperties}>
              {word}
            </span>
          </span>
          {/* the space lives between the clip boxes: inside one it would be a trailing
              space at the end of an inline block, which the browser collapses away */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  )
}

/**
 * Glen's `.lift`: the product sheet rises 8px and grows a hair on hover, with a long soft
 * shadow. His file notes that phones have no hover, so there the sheet lifts as it scrolls
 * into view (35% visible) and settles when it leaves.
 */
export const Lift = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || window.matchMedia("(min-width: 900px)").matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(e => setLifted(e.isIntersecting)), { threshold: 0.35 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${styles.lift} ${lifted ? styles.lifted : ""} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Glen 2026-09-08, twice: the sub-head "has typed animation" and, on seeing the build,
 * "and this types in". His 2026-09-10 file keeps it and adds the detail: the typing
 * starts 820ms after the line comes into view, pauses longer on spaces, commas and full
 * stops, and shows a blinking caret while it runs.
 *
 * His file also wipes the line and retypes it every time it scrolls back into view. That
 * reads as the page glitching rather than as a flourish (Zhengqi 2026-09-10), so here the
 * line types once, the first time it is seen, and then stays put — including if you scroll
 * away mid-sentence; it finishes on its own.
 *
 * Every character is laid out from the start and the ones not yet typed are merely hidden,
 * so the line's width never changes and it never rewraps. It used to be two spans — the
 * typed prefix and an invisible remainder — but the browser does not kern across a span
 * boundary, so the total width wobbled a fraction of a pixel as the split moved and the
 * centred line shimmered. The caret is out of the flow altogether — positioned off the
 * right edge of the last typed character — because even a zero-width inline bar nudged
 * the line's width by a third of a pixel depending on where it sat.
 */
export const Typed = ({ text, className = "", delay = 820 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setCount(text.length)
      return
    }

    let start: ReturnType<typeof setTimeout> | undefined
    let tick: ReturnType<typeof setTimeout> | undefined
    const stop = () => {
      clearTimeout(start)
      clearTimeout(tick)
    }
    const run = () => {
      let i = 0
      setTyping(true)
      const next = () => {
        i += 1
        setCount(i)
        if (i >= text.length) {
          setTyping(false)
          return
        }
        const c = text[i - 1]
        let d = 26 + Math.random() * 26
        if (c === " ") d += 16
        if (c === ",") d += 130
        if (c === ".") d += 220
        tick = setTimeout(next, d)
      }
      next()
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        start = setTimeout(run, delay)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      stop()
      observer.disconnect()
    }
  }, [text, delay])

  const chars = [...text]
  return (
    <span ref={ref} className={`block whitespace-pre-wrap ${className}`}>
      <span aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className={i < count ? "relative" : "invisible"}>
            {c}
            {typing && i === count - 1 && <span className={styles.caret} />}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
