"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import ReactGA from "react-ga4"

// gtagOptions https://developers.google.com/analytics/devguides/collection/ga4/reference/config#send_page_view
ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
  gtagOptions: { send_page_view: false },
})
ReactGA.set({
  customBrowserType: !isMobile ? "desktop" : "web3" in window || "ethereum" in window ? "mobileWeb3" : "mobileRegular",
})
ReactGA.event("web_version", {
  version: process.env.NEXT_PUBLIC_APP_VERSION,
})

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
