/**
 * Scroll helpers for the landing page.
 *
 * `scrollIntoView({ behavior: "smooth" })` would mostly do, but globals.css sets
 * `html { scroll-padding-top: 140px }` for the old site header, which is hidden here — the
 * landing page only has a 48px sticky pill. Animating ourselves keeps the offset correct
 * and the easing consistent between the nav, the hero CTA and the product rail.
 */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const smoothScrollTo = (top: number, duration = 650) => {
  const start = window.scrollY
  const target = Math.max(0, top)
  const distance = target - start
  if (Math.abs(distance) < 2) return

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target)
    return
  }

  const startedAt = performance.now()
  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/** brings the element's vertical centre to the middle of the viewport */
export const smoothScrollToCenter = (el: HTMLElement | null) => {
  if (!el) return
  const rect = el.getBoundingClientRect()
  smoothScrollTo(window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2)
}

/** brings the element's top just below the sticky nav — Glen's scroll-margin-top, the 76 bar + 24 */
export const smoothScrollToTop = (el: HTMLElement | null, offset = 100) => {
  if (!el) return
  smoothScrollTo(window.scrollY + el.getBoundingClientRect().top - offset)
}

/**
 * The product cards render twice — once in the desktop grid (`#compass` …) and once in the
 * phone stack (`#compass-mobile` …), only one of which is displayed at a time. Links and
 * hashes name the desktop id; this hands back whichever copy is actually on screen, so a
 * phone tap on "Compass" in the nav or footer lands on the visible card rather than on a
 * display:none one (Codex review, 2026-09-09).
 */
export const resolveAnchor = (id: string): HTMLElement | null => {
  const el = document.getElementById(id)
  if (el && el.getClientRects().length > 0) return el
  const mobile = document.getElementById(`${id}-mobile`)
  if (mobile && mobile.getClientRects().length > 0) return mobile
  return el ?? mobile
}
