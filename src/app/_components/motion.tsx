"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

const EASE = "cubic-bezier(.2,.8,.2,1)"

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** fires once, the first time the element comes within `margin` of the viewport */
const useInView = (margin = "-10% 0px") => {
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
 * Glen 2026-09-08: "WHITE sections pop slightly when scrolled to".
 *
 * Lift + a hair of scale, once, on the way in. The element keeps its layout box the
 * whole time — only transform and opacity move — so nothing below it shifts, and the
 * sticky product rail is unaffected.
 */
export const PopIn = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const { ref, seen } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity .55s ${EASE} ${delay}ms, transform .55s ${EASE} ${delay}ms`,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(16px) scale(.985)",
      }}
    >
      {children}
    </div>
  )
}

/**
 * Glen 2026-09-08: the headline "slides up to appear", then — looking at it live — "can
 * this pop up or blur in? Like a html expression".
 *
 * So it does both: still comes up, but from a slight overshoot in scale and out of a blur
 * rather than purely from below, which is what reads as a "pop" instead of a slide. The
 * travel is shorter than the old 28px for the same reason — the blur carries the entrance
 * now, and a long slide under a blur just looks slow.
 *
 * Blur is animated with its own, shorter duration so it resolves before the movement
 * settles; ending blurred-but-still would look like a rendering fault.
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
        transition: `opacity .55s ${EASE} ${delay}ms, transform .75s ${EASE} ${delay}ms, filter .45s ${EASE} ${delay}ms`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(14px) scale(.965)",
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
