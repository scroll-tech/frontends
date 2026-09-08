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
 * Glen 2026-09-08: the headline "slides up to appear".
 *
 * Rendered server-side with its real text so it stays crawlable and readable without
 * JS; the animation only ever moves it.
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
        transition: `opacity .7s ${EASE} ${delay}ms, transform .7s ${EASE} ${delay}ms`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  )
}

/**
 * Glen 2026-09-08: the sub-head gets a "typed animation".
 *
 * The full string is always in the DOM twice: once hidden but occupying its real box,
 * so the line count is fixed and nothing below jumps as characters land, and once for
 * screen readers and crawlers, which should get the sentence rather than a prefix of it.
 */
export const Typed = ({ text, className = "", speed = 26, delay = 400 }: { text: string; className?: string; speed?: number; delay?: number }) => {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length)
      setDone(true)
      return
    }
    let i = 0
    let tick: ReturnType<typeof setInterval>
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) {
          clearInterval(tick)
          setDone(true)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(start)
      clearInterval(tick)
    }
  }, [text, speed, delay])

  return (
    <span className={`relative block ${className}`}>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        <span
          className="ml-[1px] inline-block h-[1em] w-[1px] translate-y-[2px] bg-current align-baseline"
          style={{ opacity: done ? 0 : 1, transition: "opacity .3s linear" }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
