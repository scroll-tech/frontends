import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"
import { DOC_URL } from "@/constants/link"

import AnchorLink from "./AnchorLink"
import FooterRidge from "./FooterRidge"
import styles from "./landing.module.css"

// Glen's footer copy (scroll.html, 2026-09-10); his links are placeholders, ours are the
// real pages and sections. Support is not in his file: Tommy Thomas, Slack 2026-09-17
// (C0BRZ8G1V50), asked for a /support page, "hyperlink should be in footer". It sits with
// the legal links because those are the App Store listing's other URL (Zhengqi 2026-09-18).
const FOOTER_COLUMNS = [
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "App privacy policy", href: "/app-privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Compass", href: "/#compass" },
      { label: "Compass API", href: "/#api" },
      { label: "AI hardware", href: "/#hardware" },
    ],
  },
  {
    title: "Resources",
    links: [
      // the blog, back on the site and opening the column (Zhengqi, 2026-09-21); the three
      // under it are the ones his file carries, so the two footers finally say the same thing
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: DOC_URL, external: true },
      { label: "White paper", href: "/files/whitepaper.pdf", external: true },
      { label: "Scroll swap", href: "https://swap.scroll.io/swap?input=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", external: true },
    ],
  },
]

interface LandingFooterProps {
  /**
   * The landing page's footer (Glen's scroll.html, 2026-09-10): no panel of its own — it
   * sits on the page background with room left under it for the violet ridge that rises
   * as you reach the end (FooterRidge). His 2026-09-08 "Change footer to white" + "Upper
   * drop shadow on footer" stays the look for the legal pages, which leave this off.
   */
  ridge?: boolean
}

const LandingFooter = ({ ridge = false }: LandingFooterProps) => (
  <footer className={ridge ? styles.footer : styles.footerPlain}>
    {ridge && <FooterRidge />}
    <div className={`${styles.container} ${styles.footerInner}`}>
      <div className={styles.footerBrand}>
        <ScrollMarkSvg className={styles.footerMark} aria-hidden="true" />
        <p className={styles.footerTagline}>
          One plan.
          <br />
          Every model.
        </p>
      </div>
      {FOOTER_COLUMNS.map(({ title, links }) => (
        <nav key={title} className={styles.fcol} aria-label={title}>
          <h3>{title}</h3>
          {links.map(({ label, href, external }: { label: string; href: string; external?: boolean }) =>
            external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : href.includes("#") ? (
              <AnchorLink key={label} href={href}>
                {label}
              </AnchorLink>
            ) : (
              <Link key={label} href={href}>
                {label}
              </Link>
            ),
          )}
        </nav>
      ))}
    </div>
    <p className={styles.footerLegal}>© 2026 Scroll. All rights reserved.</p>
  </footer>
)

export default LandingFooter
