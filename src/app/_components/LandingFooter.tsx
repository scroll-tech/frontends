import ScrollMarkSvg from "@/assets/svgs/common/scroll-logo-icon.svg"

const FOOTER_COLUMNS = [
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Connect", href: "https://x.com/Scroll_ZKP" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Scroll Compass", href: "#compass" },
      { label: "Scroll Compass API", href: "#compass-api" },
      { label: "AI Hardware", href: "#ai-hardware" },
    ],
  },
]

const LandingFooter = () => (
  <footer className="flex w-full flex-col items-center justify-center gap-[19px] bg-[#F4F3ED] px-[24px] py-[24px] md:h-[290px]">
    <div className="flex w-full max-w-[1170px] flex-col items-start justify-between gap-[40px] md:h-[170px] md:flex-row md:items-center">
      <div className="flex flex-col items-center gap-[6px]">
        <ScrollMarkSvg className="size-[18px]" />
        <p className="w-[120px] text-center text-[14px] font-medium text-black">
          One Plan.
          <br />
          Every Model.
        </p>
      </div>
      <div className="flex gap-[56px]">
        {FOOTER_COLUMNS.map(({ title, links }) => (
          <div key={title} className="flex w-[151px] flex-col gap-[21px]">
            <p className="text-[15px] font-bold text-black">{title}</p>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[15px] text-[#5E5E5E] [font-family:var(--font-inter)] hover:text-black"
              >
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="h-px w-full max-w-[1170px] bg-[#E3E1D5]" />
    <p className="text-[15px] text-[#959595]">© 2026 Scroll. All rights reserved</p>
  </footer>
)

export default LandingFooter
