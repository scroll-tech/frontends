"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

/**
 * Glen 2026-09-08 pointed at monad.com for how text should appear. Read off their page —
 * they drive it with GSAP + ScrollTrigger, and the entrance is one recipe:
 *
 *   gsap.set("[data-fade]", { opacity: 0, y: 30 })
 *   gsap.to(el, { opacity: 1, y: 0, delay: delayVal, duration: 0.8, ease: "power2.out",
 *                 scrollTrigger: { start: "top 95%", toggleActions: "play none none none" } })
 *   delayVal = 0 | 0.25 | 0.5
 *
 * So: 30px of travel, 0.8s, GSAP's power2.out, three stagger buckets, fired once as the
 * element clears the bottom of the viewport. Their per-character roll — SplitType chars,
 * yPercent -100, stagger 0.03, power4.inOut — is a link hover, not this.
 *
 * power2.out is GSAP's cubic ease-out, hence the bezier below; the old one was nearer
 * quint and read snappier than theirs.
 */
const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)"
const TRAVEL = 30
const DURATION = 0.8
// monad's delayVal buckets are 0 / 0.25 / 0.5s. Not exported: the only consumer is the
// hero, which is a server component, and a plain array from a "use client" module crosses
// that boundary as a module reference and indexes to undefined. It writes them out instead.

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** fires once, the first time the element comes within `margin` of the viewport.
 *  The default matches their ScrollTrigger `start: "top 95%"` — the element's top passing
 *  95% of the viewport height, i.e. just as it clears the bottom edge. */
const useInView = (margin = "0px 0px -5%") => {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [margin])

  return { ref, seen }
}

/**
 * Glen 2026-09-08: "WHITE sections pop slightly when scrolled to", then monad.com as the
 * reference for how it should feel — so this is their recipe exactly: 30px, 0.8s,
 * power2.out, once, as the element clears the bottom of the viewport.
 *
 * No scale any more. Theirs is opacity and y alone, and the hair of scale was what made
 * ours read as a different, snappier gesture than the one he pointed at.
 *
 * The element keeps its layout box throughout — only transform and opacity move — so
 * nothing below it shifts and the sticky product rail is unaffected.
 */
export const PopIn = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const { ref, seen } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity ${DURATION}s ${EASE} ${delay}ms, transform ${DURATION}s ${EASE} ${delay}ms`,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${TRAVEL}px)`,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Glen 2026-09-08: the headline "slides up to appear", then "can this pop up or blur in?
 * Like a html expression", then monad.com as the reference for the feel.
 *
 * monad's is opacity and y only. The blur stays because he asked for it by name, but
 * everything else is theirs — 30px, 0.8s, power2.out — and the scale overshoot is gone,
 * since that was the part making ours read as a snappier gesture than the one he pointed
 * at. Blur keeps a shorter duration of its own so it resolves before the movement settles;
 * ending blurred-but-still would look like a rendering fault.
 *
 * Fires on mount rather than on scroll, unlike PopIn: this is the first thing on the page,
 * so there is no scroll to wait for. `delay` takes monad's buckets, which the hero passes
 * as literals — see the note by DURATION.
 *
 * Rendered server-side with its real text so it stays crawlable and readable without JS;
 * the animation only ever moves it.
 */
export const SlideUp = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
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
        transition: `opacity ${DURATION}s ${EASE} ${delay}ms, transform ${DURATION}s ${EASE} ${delay}ms, filter .5s ${EASE} ${delay}ms`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : `translateY(${TRAVEL}px)`,
        filter: on ? "blur(0px)" : "blur(12px)",
        willChange: on ? "auto" : "transform, filter, opacity",
      }}
    >
      {children}
    </div>
  )
}

/**
 * Glen 2026-09-08: the sub-head gets a "typed animation".
 *
 * The whole sentence stays in the layout the entire time and only the part not yet typed
 * is hidden, so every line break is the finished sentence's from the very first frame.
 *
 * The obvious version — an absolutely positioned layer holding text.slice(0, count) over
 * a hidden full-length spacer — fixes the box but not the wrapping, because the prefix
 * wraps on its own terms. Zhengqi caught what that looks like (2026-09-08): "through"
 * starts on line one while it is still the partial word "thro", which fits, then hops to
 * line two the moment it completes and no longer does. That hop is what read as not
 * smooth. Hiding the tail instead means no word ever moves.
 *
 * visibility rather than opacity or display, because it is the one that keeps the text in
 * flow while drawing nothing.
 *
 * There is deliberately no caret. A caret has to be an inline-block to have a size, an
 * inline-block is an atomic inline, and an atomic inline is a line-break opportunity — one
 * sitting between the typed prefix and the hidden tail lets the line break in the middle of
 * a word, and as it advances through "through" that break point travels with it and the
 * word hops lines. Measured: with a caret the wrap is unstable at 280/300/311/320px of
 * content width, 311 being exactly this sub-head's; without one it is stable at every width
 * from 240 to 500. Zero width does not save it — a zero-width atomic inline is still a
 * break opportunity, which is why the negative-margin version still jumped.
 *
 * A screen-reader copy carries the real sentence; the animated one is decorative.
 */
export const Typed = ({ text, className = "", speed = 26, delay = 400 }: { text: string; className?: string; speed?: number; delay?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length)
      return
    }
    let i = 0
    let tick: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) clearInterval(tick)
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(tick)
    }
  }, [text, speed, delay])

  return (
    <span className={`block ${className}`}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="invisible">{text.slice(count)}</span>
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
