"use client"

import Link from "next/link"
import { useStyles } from "tss-react/mui"

const ScrollLink = props => {
  const { external, underline = "none", className, reloadDocument, children, href, ...restProps } = props
  const { cx } = useStyles()

  const checkExternalLink = href.startsWith("http://") || href.startsWith("https://")

  const handleClick = e => {
    e.preventDefault()
    window.location.href = href
  }

  if (reloadDocument) {
    return (
      <a
        className={cx(
          "text-[1.6rem] font-semibold text-[var(--mui-palette-link-main)] decoration-inherit",
          underline === "always" && "underline",
          underline === "hover" && "hover:underline",
          className,
        )}
        href={href}
        target="_self"
        rel="noopener noreferrer"
        onClick={handleClick}
        {...restProps}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      className={cx(
        "text-[1.6rem] font-semibold text-[var(--mui-palette-link-main)] decoration-inherit",
        underline === "always" && "underline",
        underline === "hover" && "hover:underline",
        className,
      )}
      href={href}
      target={external || checkExternalLink ? "_blank" : ""}
      rel="noopener noreferrer"
      {...restProps}
    >
      {children}
    </Link>
  )
}
export default ScrollLink
