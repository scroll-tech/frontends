"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useHideFooter = () => {
  const pathname = usePathname()

  const hideSupport = useMemo(() => pathname.match(/^\/cloak(\/\w*)?$/g), [pathname])
  return { hideSupport }
}

export default useHideFooter
