"use client"

import * as Sentry from "@sentry/react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const SentrySetting = () => {
  const pathname = usePathname()
  useEffect(() => {
    Sentry.configureScope(scope => {
      scope.setTag("page", pathname)
    })

    return () => {
      // Clear the tag when the component is unmounted
      Sentry.configureScope(scope => {
        scope.setTag("page", "")
      })
    }
  }, [pathname])
  return null
}

export default SentrySetting
