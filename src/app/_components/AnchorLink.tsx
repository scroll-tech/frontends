"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, ReactNode } from "react"

import { resolveAnchor, smoothScrollToTop } from "./smoothScroll"

interface AnchorLinkProps {
  /** "/#compass" style — a landing-page section */
  href: string
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  children: ReactNode
}

/**
 * A link to a landing-page section. Off the landing page it is a plain <Link>; on it, the
 * click scrolls to whichever copy of the section is displayed at this breakpoint (see
 * resolveAnchor) instead of letting the router look the hash up by id, which on the phone
 * finds the hidden desktop card and goes nowhere.
 */
const AnchorLink = ({ href, className, onClick, children }: AnchorLinkProps) => {
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || pathname !== "/") return
    const id = href.split("#")[1]
    if (!id) return
    e.preventDefault()
    smoothScrollToTop(resolveAnchor(id))
    history.replaceState(null, "", href)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

export default AnchorLink
