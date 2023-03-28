import * as Sentry from "@sentry/react"
import { useEffect } from "react"

const useSentryPageTag = (tagName: string): void => {
  useEffect(() => {
    Sentry.configureScope(scope => {
      scope.setTag("page", tagName)
    })

    return () => {
      // Clear the tag when the component is unmounted
      Sentry.configureScope(scope => {
        scope.setTag("page", "")
      })
    }
  }, [tagName])
}

export default useSentryPageTag
