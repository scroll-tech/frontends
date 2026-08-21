"use client"

import { usePathname } from "next/navigation"

import useHideFooter from "@/hooks/useHideFooter"
import { isSepolia } from "@/utils"

import PureFooter from "./PureFooter"
import Support from "./Support"

const Footer = () => {
  const { hideSupport } = useHideFooter()
  const pathname = usePathname()

  // the redesigned landing page and its legal pages render their own footer
  if (isSepolia || ["/", "/privacy-policy", "/terms-of-service", "/app-privacy-policy"].includes(pathname)) {
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
