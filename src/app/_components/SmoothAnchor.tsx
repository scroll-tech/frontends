"use client"

import { MouseEvent, ReactNode } from "react"

import { smoothScrollToTop } from "./smoothScroll"

interface SmoothAnchorProps {
  /** in-page target, e.g. "#products" */
  href: string
  className?: string
  children: ReactNode
}

const SmoothAnchor = ({ href, className, children }: SmoothAnchorProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.replace("#", ""))
    if (!target) return
    e.preventDefault()
    smoothScrollToTop(target)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export default SmoothAnchor
