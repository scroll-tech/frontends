import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"

import AnchorLink from "./AnchorLink"
import FooterRidge from "./FooterRidge"
import styles from "./landing.module.css"

// Glen's footer copy (scroll.html, 2026-09-10); his links are placeholders, ours are the
// real pages and sections
const FOOTER_COLUMNS = [
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "App privacy policy", href: "/app-privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Compass", href: "/#compass" },
      { label: "Compass API", href: "/#compass-api" },
      { label: "AI hardware", href: "/#ai-hardware" },
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
          {links.map(({ label, href }) =>
            href.includes("#") ? (
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
