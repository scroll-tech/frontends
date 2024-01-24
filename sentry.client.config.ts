// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  enabled: ["Staging", "Sepolia", "Mainnet"].includes(process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT),
  environment: process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT,

  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_VERSION,
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
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  beforeSend(event) {
    const exception = event?.exception?.values?.[0]
    if (!exception) return event
    // Unexpected token '<'
    // if (exception.type === "SyntaxError" && exception.value?.includes("'<'")) return null
    // error when user reject a transaction in wallet
    if (exception.type === "Error" && exception.value?.includes("user rejected transaction")) return null
    // error from browser extension wallets that want to redefine window.ethereum
    if (exception.type === "TypeError" && exception.stacktrace?.frames?.[0]?.filename?.startsWith("chrome-extension")) return null

    return event
  },
})
