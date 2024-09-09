"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { isMobile } from "react-device-detect"
import ReactGA from "react-ga4"

import { isMainnet } from "@/utils"

if (process.env.NODE_ENV === "production" && isMainnet) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
    gtagOptions: { send_page_view: false },
  })
  ReactGA.set({
    customBrowserType: !isMobile ? "desktop" : "web3" in window || "ethereum" in window ? "mobileWeb3" : "mobileRegular",
  })
  ReactGA.event("web_version", {
    version: process.env.NEXT_PUBLIC_APP_VERSION,
  })
}

// gtagOptions https://developers.google.com/analytics/devguides/collection/ga4/reference/config#send_page_view

const GoogleAnalytics = () => {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname) {
      ReactGA.send({ hitType: "pageview", page: pathname })
    }
  }, [pathname])

  return null
}

export default GoogleAnalytics
