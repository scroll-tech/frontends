import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

const FOOTER_COLUMNS = [
  {
    title: "Legal",
    width: "w-[158px]",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "App Privacy Policy", href: "/app-privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  {
    title: "Product",
    width: "w-[151px]",
    links: [
      { label: "Compass", href: "/#compass" },
      { label: "Compass API", href: "/#compass-api" },
      { label: "AI Hardware", href: "/#ai-hardware" },
    ],
  },
]

const linkClass = "text-[15px] text-[#5E5E5E] [font-family:var(--font-inter)] transition-colors hover:text-black"

const LandingFooter = () => (
  <footer className="mt-[64px] flex w-full flex-col items-center px-[24px] py-[40px] md:mt-[96px] md:px-[96px]">
    <div className="flex w-full max-w-[1170px] flex-col gap-[20px]">
      <div className="flex flex-col gap-[40px] py-[32px] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-[8px] self-start md:items-center md:self-auto">
          <ScrollMarkSvg className="h-[20px] w-auto" />
          <p className="max-w-[120px] text-left text-[14px] font-medium text-black md:text-center">
            One Plan.
            <br />
            Every Model.
          </p>
        </div>
        <div className="flex gap-[56px]">
          {FOOTER_COLUMNS.map(({ title, width, links }) => (
            <div key={title} className={`flex ${width} flex-col items-start gap-[20px]`}>
              <p className="text-[15px] font-bold text-black">{title}</p>
              {links.map(({ label, href }) =>
                href.startsWith("http") ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {label}
                  </a>
                ) : (
                  <Link key={label} href={href} className={linkClass}>
                    {label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-[#E7E7E7]" />
      <p className="text-center text-[15px] text-[#959595]">© 2026 Scroll. All rights reserved</p>
    </div>
  </footer>
)

export default LandingFooter
