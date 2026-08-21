import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/common/scroll-logo-icon.svg"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Scroll Compass", href: "/#compass" },
  { label: "ZK API Keys", href: "/#compass-api" },
  { label: "AI hardware", href: "/#ai-hardware" },
]

const LandingNav = () => (
  <nav className="mx-auto flex h-[64px] w-full max-w-[828px] items-center justify-between rounded-[32px] bg-white pl-[16px] pr-[24px] shadow-[0px_4px_12px_rgba(0,0,0,0.04)]">
    <div className="flex items-center gap-[12px]">
      <Link href="/" aria-label="Scroll home" className="flex size-[36px] items-center justify-center rounded-[18px] bg-[#F4F3ED]">
        <ScrollMarkSvg className="size-[22px]" />
      </Link>
      <Link href="/#compass" className="flex h-[32px] items-center rounded-[16px] bg-[#F4F3ED] pl-[12px] pr-[8px] text-[14px] font-medium text-black">
        Scroll Compass
      </Link>
    </div>
    <div className="hidden items-center gap-[24px] md:flex">
      {NAV_LINKS.map(({ label, href }) => (
        <Link key={label} href={href} className="text-[14px] font-medium text-[#0B192C] hover:opacity-70">
          {label}
        </Link>
      ))}
    </div>
  </nav>
)

export default LandingNav
