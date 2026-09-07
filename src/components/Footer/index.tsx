"use client"

import { usePathname } from "next/navigation"

import useHideFooter from "@/hooks/useHideFooter"
import { hasLegacyChrome, isSepolia } from "@/utils"

import PureFooter from "./PureFooter"
import Support from "./Support"

const Footer = () => {
  const { hideSupport } = useHideFooter()
  const pathname = usePathname()

  // only the handful of remaining legacy routes still get this footer
  if (isSepolia || !hasLegacyChrome(pathname)) {
    return null
  }
  return (
    <>
      {!hideSupport && <Support />}
      <PureFooter></PureFooter>
    </>
  )
}

export default Footer
