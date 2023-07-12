import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import React from "react"
import { isMobile } from "react-device-detect"
import ReactDOM from "react-dom/client"
import ReactGA from "react-ga4"
import { BrowserRouter } from "react-router-dom"

import { requireEnv } from "@/utils"

import App from "./App"
import "./appGlobals"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "./styles/globals.less"
import "./styles/index.less"
import ScrollThemeProvider from "./theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

if (requireEnv("NODE_ENV") === "production") {
  Sentry.init({
    environment: requireEnv("REACT_APP_SCROLL_ENVIRONMENT"),
    dsn: requireEnv("REACT_APP_SENTRY_DSN"),
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
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

  const GOOGLE_ANALYTICS_ID: string | undefined = requireEnv("REACT_APP_GOOGLE_ANALYTICS_ID")
  if (typeof GOOGLE_ANALYTICS_ID === "string") {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.set({
      customBrowserType: !isMobile ? "desktop" : "web3" in window || "ethereum" in window ? "mobileWeb3" : "mobileRegular",
    })
    ReactGA.event("web_version", {
      version: requireEnv("REACT_APP_VERSION"),
    })
  }
}

root.render(
  // <React.StrictMode>
  <ScrollThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ScrollThemeProvider>,
  // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
