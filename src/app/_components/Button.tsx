import Link from "next/link"
import { CSSProperties, MouseEvent } from "react"

import AnchorLink from "./AnchorLink"
import styles from "./button.module.css"

interface ButtonProps {
  /** "/#compass" scrolls on the landing page, "/sign-up" routes, "https://…" opens a new tab
   *  when `external`. Omit it for a real <button> — a form's submit, say. */
  href?: string
  external?: boolean
  /** ink fill with white type; the default is white with a hairline */
  solid?: boolean
  /** for the <button> form only */
  type?: "button" | "submit"
  disabled?: boolean
  /** on a link, call preventDefault to keep the href as the no-JS fallback */
  onClick?: (e: MouseEvent<HTMLElement>) => void
  className?: string
  /** the label — plain text, since every character becomes its own rolling span */
  children: string
}

/**
 * Glen's button (scroll.html, 2026-09-10) — see button.module.css for the look. The
 * label is split into characters here, on the server, so the roll needs no effect: each
 * span carries its own copy of the letter in `data-c` for the CSS to draw underneath.
 */
const Button = ({ href, external = false, solid = false, type = "button", disabled = false, onClick, className = "", children }: ButtonProps) => {
  const cls = `${styles.btn} ${solid ? styles.solid : ""} ${className}`
  const label = (
    <>
      <span className={styles.roll} aria-hidden="true">
        {[...children].map((c, i) => (
          <span key={i} className={styles.ch} style={{ "--i": i } as CSSProperties} data-c={c}>
            {c}
          </span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </>
  )

  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={cls}>
        {label}
      </button>
    )
  }
  if (href.startsWith("/#")) {
    return (
      <AnchorLink href={href} className={cls} onClick={onClick}>
        {label}
      </AnchorLink>
    )
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {label}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label}
    </a>
  )
}

export default Button
