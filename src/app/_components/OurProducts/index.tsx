"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

import { COMPASS_API_URL } from "@/constants/link"

import { ArrowCircleIcon } from "../LandingIcons"
import { geistMono } from "../fonts"
import { smoothScrollToCenter } from "../smoothScroll"
import AIHardwarePanel from "./AIHardwarePanel"
import CompassApiPanel from "./CompassApiPanel"
import CompassPanel from "./CompassPanel"

export const COMPASS_APP_STORE_URL = "https://apps.apple.com/gb/app/pocketpal-travel-buddy/id6774113297"

interface Product {
  id: string
  index: string
  title: string
  description: string
  href: string
  external: boolean
  /** the phone card sizes itself per product — the design only draws the Compass one */
  mobileClass: string
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
    mobileClass: "aspect-[311/516] max-h-[600px]",
    panel: <CompassPanel />,
  },
  {
    id: "compass-api",
    index: "02",
    title: "Compass API",
    description: "Keys to models secured by ZK proofs",
    href: COMPASS_API_URL,
    external: true,
    mobileClass: "",
    panel: <CompassApiPanel />,
  },
  {
    id: "ai-hardware",
    index: "03",
    title: "AI Hardware",
    description: "Your Agents stored locally.",
    href: "/sign-up",
    external: false,
    mobileClass: "",
    panel: <AIHardwarePanel />,
  },
]

const OurProducts = () => {
  const [active, setActive] = useState(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  // the panel crossing the middle of the viewport owns the rail — same idea as
  // diabrowser.com's pinned section (Glen's "scrolling feature" reference)
  useEffect(() => {
    const nodes = panelRefs.current.filter(Boolean) as HTMLDivElement[]
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

  const goTo = (index: number) => {
    smoothScrollToCenter(panelRefs.current[index])
  }

  return (
    <section id="products" className="w-full scroll-mt-[96px] px-[16px] pt-[80px] md:pt-[200px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className={`${geistMono.className} text-center text-[32px] font-semibold text-black md:text-[48px]`}>Our Products</h2>

        <div className="mt-[40px] flex gap-[73px] md:mt-[62px]">
          <div className="hidden w-[241px] shrink-0 md:block">
            {/* pinned at 20vh like diabrowser.com's rail, so its top sits level with the top of
                the card beside it rather than floating at the vertical centre */}
            <nav className="sticky top-[20vh] flex flex-col gap-[91px]" aria-label="Products">
              {PRODUCTS.map((product, i) => {
                const isActive = i === active
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive}
                    className={`relative block w-full text-left transition-[padding] duration-300 ${isActive ? "pl-[12px]" : "pl-0"}`}
                  >
                    <span
                      className={`absolute bottom-[7px] left-0 top-[7px] w-[2px] rounded-full bg-black transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className={`${geistMono.className} block text-[10px] leading-[10px] ${isActive ? "text-[#757575]" : "text-[#BABABA]"}`}>
                      {product.index}
                    </span>
                    <span
                      className={`${geistMono.className} block text-[32px] font-semibold leading-[42px] transition-colors duration-300 ${
                        isActive ? "text-black" : "text-[#7A7A7F]"
                      }`}
                    >
                      {product.title}
                    </span>
                    <span
                      className={`grid overflow-hidden transition-all duration-300 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="block text-[15px] leading-[19px] text-[#636363]">{product.description}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* the first card sits directly under the section title (62px in the design);
              the others centre themselves in their own screen */}
          <div className="flex min-w-0 flex-1 flex-col">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                id={product.id}
                ref={node => {
                  panelRefs.current[i] = node
                }}
                className={`flex scroll-mt-[96px] flex-col justify-center py-[40px] md:py-[40px] ${
                  // product 01 shares its screen with the section title, so it gives back
                  // that height (48px heading + 62px gap) and hangs from the top
                  i === 0 ? "md:min-h-[calc(100vh-110px)] md:justify-start md:pt-0" : "md:min-h-screen"
                }`}
              >
                <div className="mb-[20px] md:hidden">
                  <span className={`${geistMono.className} block text-[10px] leading-[10px] text-[#757575]`}>{product.index}</span>
                  <span
                    className={`${geistMono.className} block border-l-2 border-black pl-[10px] text-[28px] font-semibold leading-[38px] text-black`}
                  >
                    {product.title}
                  </span>
                  <span className="block pl-[12px] text-[14px] leading-[18px] text-[#636363]">{product.description}</span>
                </div>

                <div className={`relative w-full overflow-hidden rounded-[12px] bg-white md:aspect-[886/572] ${product.mobileClass}`}>
                  {product.panel}
                  <a
                    href={product.href}
                    {...(product.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`Open ${product.title}`}
                    className="absolute bottom-[16px] right-[16px] block size-[34px] text-[#959595] transition-colors hover:text-black md:bottom-[22px] md:right-[22px]"
                  >
                    <ArrowCircleIcon className="size-full" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProducts
