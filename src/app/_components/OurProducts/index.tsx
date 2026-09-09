"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

import { COMPASS_API_URL } from "@/constants/link"

import { ArrowCircleIcon } from "../LandingIcons"
import { geistMono } from "../fonts"
import { PopIn } from "../motion"
import { resolveAnchor, smoothScrollToCenter, smoothScrollToTop } from "../smoothScroll"
import AIHardwarePanel from "./AIHardwarePanel"
import CompassApiPanel from "./CompassApiPanel"
import CompassPanel from "./CompassPanel"

export const COMPASS_APP_STORE_URL = "https://apps.apple.com/gb/app/pocketpal-travel-buddy/id6774113297"

// every card is the same 311 x 516 sheet on phones — the design draws one component
// (Frame 1948761911) for the hero and for the sections. The cap stops it turning into a
// 1200px column on a tablet, where this layout is still the one in play (md = 900px).
const MOBILE_CARD = "aspect-[311/516] max-h-[600px]"

interface Product {
  id: string
  index: string
  title: string
  description: string
  href: string
  external: boolean
  /** the phone card sizes itself per product — the design only draws the Compass one */
  mobileClass: string
  /** Glen 2026-09-08 gives Compass a labelled button; the other two keep the arrow */
  ctaLabel?: string
  panel: ReactNode
}

const PRODUCTS: Product[] = [
  {
    id: "compass",
    index: "01",
    title: "Compass",
    description: "Every AI model in one iOS app",
    href: COMPASS_APP_STORE_URL,
    external: true,
    mobileClass: MOBILE_CARD,
    ctaLabel: "Download",
    panel: <CompassPanel />,
  },
  {
    id: "compass-api",
    index: "02",
    title: "Compass API",
    description: "Keys to models secured by ZK proofs",
    href: COMPASS_API_URL,
    external: true,
    mobileClass: MOBILE_CARD,
    panel: <CompassApiPanel />,
  },
  {
    id: "ai-hardware",
    index: "03",
    title: "AI Hardware",
    description: "Your Agents stored locally.",
    href: "/sign-up",
    external: false,
    mobileClass: MOBILE_CARD,
    panel: <AIHardwarePanel />,
  },
]

const SHEET = "relative w-full overflow-hidden rounded-[12px] bg-white shadow-[0_8px_32px_rgba(17,17,17,0.05)]"

const Cta = ({ product }: { product: Product }) => {
  const linkProps = product.external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  return product.ctaLabel ? (
    <a
      href={product.href}
      {...linkProps}
      className="absolute bottom-[16px] right-[16px] flex h-[34px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] px-[18px] text-[13px] font-medium text-black transition-colors hover:bg-[#F8F8F8] md:bottom-[22px] md:right-[22px] md:h-[38px] md:px-[22px] md:text-[14px]"
    >
      {product.ctaLabel}
    </a>
  ) : (
    <a
      href={product.href}
      {...linkProps}
      aria-label={`Open ${product.title}`}
      className="absolute bottom-[16px] right-[16px] block size-[34px] text-[#959595] transition-colors hover:text-black md:bottom-[22px] md:right-[22px]"
    >
      <ArrowCircleIcon className="size-full" />
    </a>
  )
}

/**
 * Layout, spacing and sizing are diabrowser.com's "Dia reads between the tabs" section,
 * measured off the live page (2026-09-09, 1728 x 997). Glen: "Lets use this part of dia
 * browser. Again stealing their layout and overall design, but replacing it with our own
 * assets and copy … using how their spacing and sizing. They vertically stack in mobile."
 *
 * Desktop, read off their DOM:
 *   section  max-w 1400, px 10                    → 1380 of content
 *   heading  mb 50
 *   grid     12 columns, column gap 20
 *   rail     col-span-4, sticky top 20vh; items are padded blocks (24 / 20, radius 16)
 *            stacked with no gap; 3px bar inset 16% top and bottom; number 11px mono,
 *            title 24 / 30, body 14 / 20
 *   visuals  col-span-8, flex column, row gap 20; each visual sits in a slot that is
 *            min-h 60vh, top-aligned, 40 of bottom padding
 *
 * That last rule is the whole "large spacing between each element" Glen pointed at: Dia
 * doesn't set a gap, it gives every visual a 60vh slot and lets the leftover be air. So
 * the space scales with the window — big on a laptop, tighter on a tall monitor. A fixed
 * 140 was the previous reading of the same request; this is the actual recipe.
 *
 * One addition to theirs: a floor. Our card is taller than Dia's picture for its width
 * (572/886, so ≈590 at this column), and on a 1440 x 800 laptop 60vh is only 480 — the
 * slot then collapses to the card plus 40, leaving 60 between cards, which is exactly the
 * spacing he asked us to get away from. The slot therefore never goes under the card's
 * own height (64.56cqw = 572/886 of the column) plus 100, so cards are always ≥ 120 apart.
 *
 * Translations, not deviations: their 1400/10 container is our section's 16px page gutter
 * around a 1380 cap — identical at the reference width, and the 16 is what every other
 * landing section uses on the phone. Their desktop layout starts at 800px; ours at this
 * project's md = 900, where the hero and nav also switch. Card radius stays our 12 (Dia
 * draws 20 on the phone) — the sheet is "our own asset", and it matches the hero card.
 *
 * Phone (measured at 390): image first, copy under it (number 12 / 16, title 24 / 30,
 * body 16 / 24 — larger than the desktop rail's 14 / 20), 20 between image and copy, 60
 * between blocks, 60 above the section, heading 32 with 40 under it. Theirs stacks in
 * that order; ours used to put the copy above the card. Their page gutter is 10 to our
 * 16, and their image radius 20 to our sheet's 12 — the sheet is ours.
 */
const OurProducts = () => {
  const [active, setActive] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // the card crossing the middle of the viewport owns the rail — same idea as
  // diabrowser.com's pinned section (Glen's "scrolling feature" reference). Observed on
  // the card, not its slot: the slot's extra air below would otherwise count as the card.
  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!nodes.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const index = nodes.indexOf(entry.target as HTMLDivElement)
          if (index >= 0) setActive(index)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Arriving with a hash (footer link from another page, a shared URL): the router scrolls
  // to the desktop id, which on the phone is display:none and goes nowhere. Redirect the
  // scroll to whichever copy is showing.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!PRODUCTS.some(p => p.id === id)) return
    const target = resolveAnchor(id)
    if (target && target !== document.getElementById(id)) smoothScrollToTop(target)
  }, [])

  const goTo = (index: number) => {
    smoothScrollToCenter(cardRefs.current[index])
  }

  return (
    // dia puts 80 between sections on desktop (mt-80 / mb-100 on theirs), 60 on the phone
    <section id="products" className="w-full scroll-mt-[96px] px-[16px] pt-[60px] md:pt-[100px]">
      <div className="mx-auto w-full max-w-[1380px]">
        {/* dia: mb-40 on the phone, mb-50 on desktop */}
        <h2 className={`${geistMono.className} mb-[40px] text-center text-[32px] font-semibold text-black md:mb-[50px] md:text-[48px]`}>
          Our Products
        </h2>

        {/* ---------- desktop: dia's 4 / 8 grid with a pinned rail ---------- */}
        <div className="hidden grid-cols-12 gap-x-[20px] md:grid">
          <div className="col-span-4">
            <nav className="sticky top-[20vh]" aria-label="Products">
              {PRODUCTS.map((product, i) => {
                const isActive = i === active
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive}
                    className="relative block w-full rounded-[16px] px-[24px] py-[20px] text-left"
                  >
                    <span
                      className={`absolute bottom-[16%] left-0 top-[16%] w-[3px] rounded-full bg-black/85 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`${geistMono.className} mb-[6px] block text-[11px] leading-[14px] transition-colors duration-300 ${
                        isActive ? "text-[#757575]" : "text-[#BABABA]"
                      }`}
                    >
                      {product.index}
                    </span>
                    <span
                      className={`${geistMono.className} block text-[24px] font-semibold leading-[30px] transition-colors duration-300 ${
                        isActive ? "text-black" : "text-[#7A7A7F]"
                      }`}
                    >
                      {product.title}
                    </span>
                    <span
                      className={`grid overflow-hidden transition-all duration-300 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="block max-w-[38ch] pt-[10px] text-[14px] leading-[20px] text-[#636363]">{product.description}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* @container so the slot floor below can be written in the column's own width */}
          <div className="@container col-span-8 flex min-w-0 flex-col gap-y-[20px]">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                id={product.id}
                // dia's slot: 60vh minimum, visual at the top, 40 under it — plus our floor
                // of card height + 100 (see the note above the component)
                className="flex min-h-[max(60vh,calc(64.56cqw+100px))] scroll-mt-[96px] items-start pb-[40px]"
              >
                <div
                  ref={node => {
                    cardRefs.current[i] = node
                  }}
                  className="w-full"
                >
                  {/* Glen 2026-09-08: "WHITE sections pop slightly when scrolled to" */}
                  <PopIn className={`${SHEET} aspect-[886/572]`}>
                    {product.panel}
                    <Cta product={product} />
                  </PopIn>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- phone: dia's stack, image then copy, 60 between blocks ---------- */}
        <div className="flex flex-col gap-y-[60px] md:hidden">
          {PRODUCTS.map(product => (
            <div key={product.id} id={`${product.id}-mobile`} className="flex scroll-mt-[96px] flex-col gap-y-[20px]">
              <PopIn className={`${SHEET} ${product.mobileClass}`}>
                {product.panel}
                <Cta product={product} />
              </PopIn>
              <div className="px-[4px]">
                <span className={`${geistMono.className} mb-[6px] block text-[12px] leading-[16px] text-[#757575]`}>{product.index}</span>
                <span className={`${geistMono.className} mb-[10px] block text-[24px] font-semibold leading-[30px] text-black`}>{product.title}</span>
                <span className="block max-w-[38ch] text-[16px] leading-[24px] text-[#636363]">{product.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurProducts
