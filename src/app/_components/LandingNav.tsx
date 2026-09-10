"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, useState } from "react"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

import { resolveAnchor, smoothScrollTo, smoothScrollToTop } from "./smoothScroll"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Compass", href: "/#compass" },
  { label: "ZK API Keys", href: "/#compass-api" },
  { label: "AI hardware", href: "/#ai-hardware" },
]

const LandingNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    <div className="relative mx-auto w-full max-w-[828px]">
      {/* Glen 2026-09-08 asked to "Make nav bar pop. Up slightly when hovered", then on
          seeing it: "This popping up feels strange. It's not very smooth." So the hover
          lift is gone and only the shadow answers the pointer — the bar itself never
          moves. Its other movement, a 14px jump the moment you scrolled, was the sticky
          offset not matching the resting one; page.tsx holds that pair now. */}
      {/* Glen 2026-09-09 23:54, after Kevin's note that the "Scroll" brandmark looked wrong on
          the purple badge: "remove purple from nav bar … Move logo and scroll together so they
          sit closer and evenly spaced". So no #E4E4F4 pills any more — the mark and the word
          are one lockup, 8 apart, inset from the bar's edge by the same 24 the links keep on
          the right (16 on the phone, where the burger sits at 6). */}
      <nav className="flex h-[48px] w-full items-center justify-between rounded-full bg-white pl-[16px] pr-[6px] shadow-[0px_4px_16px_rgba(17,17,17,0.06)] md:pl-[24px] md:pr-[24px] transition-[box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:shadow-[0px_12px_28px_rgba(17,17,17,0.10)]">
        <Link href="/" aria-label="Scroll home" onClick={e => handleNavClick(e, "/")} className="flex items-center gap-[8px]">
          <ScrollMarkSvg className="h-[20px] w-auto" />
          <span className="text-[14px] font-medium leading-none text-black">Scroll</span>
        </Link>
        <div className="hidden items-center gap-[24px] md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={e => handleNavClick(e, href)} className="text-[14px] font-medium text-[#0B192C] hover:opacity-70">
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="flex size-[36px] flex-col items-center justify-center gap-[4px] rounded-full md:hidden"
        >
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="absolute inset-x-0 top-[60px] z-50 flex flex-col gap-[4px] rounded-[24px] bg-white p-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.08)] md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={e => handleNavClick(e, href)}
              className="rounded-[16px] px-[16px] py-[10px] text-[14px] font-medium text-[#0B192C] hover:bg-[#F3F3F3]"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default LandingNav
