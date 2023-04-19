import * as Sentry from "@sentry/react"

export const sentryDebug = message => {
  Sentry.withScope(function (scope) {
    scope.setLevel("debug")
    Sentry.captureException(new Error(message))
  })
}
