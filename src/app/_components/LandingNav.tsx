"use client"

import Link from "next/link"
import { useState } from "react"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Compass", href: "/#compass" },
  { label: "ZK API Keys", href: "/#compass-api" },
  { label: "AI hardware", href: "/#ai-hardware" },
]

const LandingNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-[828px]">
      <nav className="flex h-[64px] w-full items-center justify-between rounded-[32px] bg-white pl-[16px] pr-[24px] shadow-[0px_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-[12px]">
          <Link href="/" aria-label="Scroll home" className="flex size-[36px] items-center justify-center rounded-[18px] bg-[#F4F3ED]">
            <ScrollMarkSvg className="h-[20px] w-auto" />
          </Link>
          <Link href="/" className="flex h-[32px] items-center rounded-[16px] bg-[#F4F3ED] pl-[12px] pr-[8px] text-[14px] font-medium text-black">
            Scroll
          </Link>
        </div>
        <div className="hidden items-center gap-[24px] md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="text-[14px] font-medium text-[#0B192C] hover:opacity-70">
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="flex size-[36px] flex-col items-center justify-center gap-[4px] rounded-[18px] md:hidden"
        >
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-[18px] rounded-full bg-black transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="absolute inset-x-0 top-[72px] z-50 flex flex-col gap-[4px] rounded-[24px] bg-white p-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.08)] md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-[16px] px-[16px] py-[10px] text-[14px] font-medium text-[#0B192C] hover:bg-[#F4F3ED]"
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
