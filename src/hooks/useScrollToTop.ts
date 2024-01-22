"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

function ScrollToTop({ children }: any) {
  const pathname = usePathname()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [pathname])
  return children
}

export default ScrollToTop
