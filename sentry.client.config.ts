// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs"

window.onerror = function (message, source, lineno, colno, error) {
  console.log("Global error captured:", error)
}

window.addEventListener("unhandledrejection", function (event) {
  console.log("Unhandled rejection captured:", event.reason)
})

Sentry.init({
  enabled: ["Staging", "Sepolia", "Mainnet"].includes(process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT),
  environment: process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_VERSION,
  autoSessionTracking: false,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Integrations.Breadcrumbs({
      console: false,
      dom: false,
      fetch: false,
      history: false,
      sentry: false,
      xhr: false,
    }),
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  beforeSend(event) {
    if (!event.exception) {
      return null
    }
    return event
  },
})
