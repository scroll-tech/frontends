"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, useEffect, useState } from "react"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

import styles from "./nav.module.css"
import { resolveAnchor, smoothScrollTo, smoothScrollToTop } from "./smoothScroll"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Compass", href: "/#compass" },
  { label: "ZK API keys", href: "/#compass-api" },
  { label: "AI hardware", href: "/#ai-hardware" },
]

/** true once the page has scrolled past `threshold`; read on a frame, not on every event */
const useScrolled = (threshold: number, enabled: boolean) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > threshold)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold, enabled])

  return scrolled
}

interface LandingNavProps {
  /**
   * The landing page's behaviour (Glen's scroll.html, 2026-09-10): the bar is open at the
   * top of the page and folds into the pill once you have scrolled 24px — see
   * nav.module.css. Sign-up, the 404 and the legal pages leave this off and get the pill
   * throughout.
   */
  collapsible?: boolean
}

const LandingNav = ({ collapsible = false }: LandingNavProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(24, collapsible)

  // on the landing page itself, scroll smoothly instead of re-navigating (Home would jump otherwise)
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    if (pathname !== "/") return
    e.preventDefault()
    const id = href.split("#")[1]
    if (id) {
      smoothScrollToTop(resolveAnchor(id))
    } else {
      smoothScrollTo(0)
    }
    history.replaceState(null, "", href)
  }

  return (
    <div className={`${styles.wrap} ${collapsible ? styles.floating : ""} ${collapsible && !scrolled ? styles.open : ""}`}>
      {/* Glen's brand (scroll.html, 2026-09-10): the 22px mark and the word on a faint grey
          pill, 12 apart. Not the purple badge Kevin flagged on 2026-09-09 — that was #E4E4F4;
          this is a 5.5% wash of the ink. */}
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" aria-label="Scroll home" onClick={e => handleNavClick(e, "/")} className="flex items-center gap-[12px]">
          <ScrollMarkSvg className="size-[22px]" />
          <span className={styles.brandName}>Scroll</span>
        </Link>
        <div className="hidden items-center gap-[24px] md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={e => handleNavClick(e, href)}
              className={`${styles.link} text-[14px] text-[#4A4845] hover:text-[#0A0A0A]`}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="flex size-[40px] flex-col items-center justify-center gap-[4px] rounded-[8px] md:hidden"
        >
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
        {open && (
          <div className="absolute inset-x-0 top-[calc(100%+8px)] z-50 flex flex-col gap-[4px] rounded-[20px] border border-solid border-black/5 bg-white/95 p-[12px] shadow-[0px_20px_50px_-24px_rgba(46,27,112,0.3)] backdrop-blur-[18px] md:hidden">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={e => handleNavClick(e, href)}
                className="rounded-[12px] px-[16px] py-[12px] text-[16px] text-[#0A0A0A] hover:bg-[#F4F2F0]"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  )
}

export default LandingNav
