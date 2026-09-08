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

/**
 * The nav gets its own, opposite entrance, which is also monad's — Zhengqi spotted that
 * theirs drops in while the copy rises. Read off their page:
 *
 *   .navbar { transform: translateY(-100px); opacity: 0 }          // in CSS
 *   tl.to('.navbar', { y: 0, opacity: 1, duration: 1, ease: 'quart.out' }, 0)
 *
 * quart.out is GSAP's quartic ease-out, hence this bezier; 1s, not the 0.8 the copy uses.
 */
const EASE_QUART = "cubic-bezier(0.165, 0.84, 0.44, 1)"
const DROP = 100
const DROP_DURATION = 1
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
 * The nav dropping in from above, on load — monad's `.navbar` step, values by DROP above.
 *
 * Not the movement Glen objected to. "This popping up feels strange. It's not very smooth"
 * was about the hover lift and the 14px hop the sticky offset caused, both of which fired
 * every time you touched or scrolled the page; this happens once, on arrival, and settles
 * to transform:none so the sticky bar is untouched afterwards.
 */
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
        transition: `opacity ${DROP_DURATION}s ${EASE_QUART}, transform ${DROP_DURATION}s ${EASE_QUART}`,
        opacity: on ? 1 : 0,
        transform: on ? "none" : `translateY(-${DROP}px)`,
      }}
    >
      {children}
    </div>
  )
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
