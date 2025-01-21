// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  enabled: ["Staging", "Sepolia", "Mainnet"].includes(process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT),
  environment: process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.NEXT_PUBLIC_VERSION,
  autoSessionTracking: false,
  allowUrls: [/scroll\.io/, /localhost/, /vercel\.app/],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Ignore specific error messages
  ignoreErrors: [
    // MetaMask and other wallet plugin common errors
    "MetaMask",
    "Non-Error promise rejection captured",
    "User rejected the request",
    "User denied transaction signature",
    // Extension injected errors
    "Extension context invalidated",
    "The message port closed before a response was received",
    "Failed to fetch",
    // RPC related errors
    "Internal JSON-RPC error",
    "JsonRpcEngine",
    // Common Web3 errors
    "User denied message signature",
    "Transaction was rejected",
  ],

  // Ignore errors from specific sources
  denyUrls: [
    // Common wallet extension sources
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
  ],

  // Only capture errors we really care about
  beforeSend(event) {
    // Return null if error comes from extension to prevent sending to Sentry
    if (event.exception?.values?.[0]?.stacktrace?.frames?.some(frame => frame.filename?.includes("extension://"))) {
      return null
    }
    return event
  },
})
