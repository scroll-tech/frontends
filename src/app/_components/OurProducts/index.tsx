"use client"

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react"

import { COMPASS_API_URL } from "@/constants/link"

import Button from "../Button"
import { openWaitlist } from "../WaitlistOverlay"
import styles from "../landing.module.css"
import { Lift, Reveal } from "../motion"
import { resolveAnchor, smoothScrollToTop } from "../smoothScroll"
import AIHardwarePanel from "./AIHardwarePanel"
import CompassApiPanel from "./CompassApiPanel"
import CompassPanel from "./CompassPanel"

export const COMPASS_APP_STORE_URL = "https://apps.apple.com/gb/app/pocketpal-travel-buddy/id6774113297"

interface Product {
  id: string
  index: string
  title: string
  description: string
  /** the line in the panel's foot, beside the button */
  note: string
  ctaLabel: string
  href: string
  external: boolean
  /** intercepts the button; the href stays as the fallback without JS */
  onCta?: (e: MouseEvent<HTMLElement>) => void
  figure: ReactNode
}

// Copy is Glen's (scroll.html, 2026-09-10). Links are ours where his are placeholders: his
// Download and Read the docs go nowhere; ours open the App Store and Compass. His Join the
// waitlist opens a login overlay; ours opens the same card with the waitlist form in it
// (WaitlistOverlay), and falls back to the /sign-up page without JS.
const PRODUCTS: Product[] = [
  {
    id: "compass",
    index: "01",
    title: "Compass",
    description: "Every AI model in one iOS app",
    note: "Drag to rotate. Tap a card to pin it.",
    ctaLabel: "Download",
    href: COMPASS_APP_STORE_URL,
    external: true,
    figure: (
      <div className={`${styles.figure} ${styles.figureSphere}`}>
        <CompassPanel />
      </div>
    ),
  },
  {
    id: "compass-api",
    index: "02",
    title: "Compass API",
    description: "Keys to models secured by ZK proofs",
    note: "One key. Every provider. No prompts stored.",
    ctaLabel: "Read the docs",
    href: COMPASS_API_URL,
    external: true,
    figure: <CompassApiPanel />,
  },
  {
    id: "ai-hardware",
    index: "03",
    title: "AI Hardware",
    description: "Your agents stored locally",
    note: "Tap the device to open it up.",
    ctaLabel: "Join the waitlist",
    href: "/sign-up",
    external: false,
    onCta: e => {
      e.preventDefault()
      openWaitlist()
    },
    figure: <AIHardwarePanel />,
  },
]

/**
 * Glen's products section (scroll.html, 2026-09-10): a centred serif title and lede, then a
 * two-column grid — a sticky rail of the three products on the left, their panels stacked
 * on the right. Each panel is a white card that slides in from the right (Reveal plain),
 * lifts on hover (Lift), and holds its figure and a foot with a note and a button. Under
 * 1000px the rail goes and each panel grows a head with its number, name and line.
 *
 * The rail follows whichever panel's centre sits nearest a reading line 45% down the
 * viewport, checked on scroll — his `syncRail`: "no intersection bands to misfire when one
 * panel is much taller than another". Clicking a rail item scrolls its panel up under the
 * nav. Sizes and gaps are his, in landing.module.css.
 */
const OurProducts = () => {
  const [active, setActive] = useState(0)
  const panelRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let ticking = false
    const sync = () => {
      ticking = false
      const line = window.innerHeight * 0.45
      let best = 0
      let bestDistance = Infinity
      panelRefs.current.forEach((node, i) => {
        if (!node) return
        const rect = node.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - line)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      })
      setActive(best)
    }
    const schedule = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(sync)
    }
    sync()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  // arriving with a hash from another page: the router's jump lands before the sticky nav
  // is accounted for, so re-run it through the same scroll the nav uses
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!PRODUCTS.some(p => p.id === id)) return
    smoothScrollToTop(resolveAnchor(id))
  }, [])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault()
    smoothScrollToTop(panelRefs.current[index])
    history.replaceState(null, "", `/#${PRODUCTS[index].id}`)
  }

  return (
    <section id="products" className={`${styles.products} w-full scroll-mt-[100px]`}>
      <div className={`${styles.container} ${styles.productsHead}`}>
        <Reveal>
          <h2 className={styles.sectionTitle}>Scroll products</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className={`${styles.lede} ${styles.ledeBelowTitle}`}>An app, an API and a box on your desk. Same keys, same models, same proofs.</p>
        </Reveal>
      </div>

      <div className={`${styles.container} ${styles.productsGrid}`}>
        <aside className={styles.rail} aria-label="Products">
          <ol className={styles.railList}>
            {PRODUCTS.map((product, i) => (
              <li key={product.id} className={`${styles.railItem} ${i === active ? styles.railItemActive : ""}`}>
                <a href={`/#${product.id}`} className={styles.railLink} onClick={e => goTo(e, i)} aria-current={i === active ? "true" : undefined}>
                  <span className={styles.railNum}>{product.index}</span>
                  <span className={styles.railName}>{product.title}</span>
                  <span className={styles.railDesc}>{product.description}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className={styles.panels}>
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} plain>
              <article
                id={product.id}
                ref={node => {
                  panelRefs.current[i] = node
                }}
                className="scroll-mt-[100px]"
              >
                <Lift className={styles.panel}>
                  <header className={styles.panelHead}>
                    <span className={styles.panelNum}>{product.index}</span>
                    <h3 className={styles.panelName}>{product.title}</h3>
                    <p className={styles.panelDesc}>{product.description}</p>
                  </header>
                  {product.figure}
                  <div className={styles.panelFoot}>
                    <p className={styles.panelNote}>{product.note}</p>
                    <Button href={product.href} external={product.external} onClick={product.onCta}>
                      {product.ctaLabel}
                    </Button>
                  </div>
                </Lift>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurProducts
