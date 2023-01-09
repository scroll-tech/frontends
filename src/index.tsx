import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import React from "react"
import { isMobile } from "react-device-detect"
import ReactDOM from "react-dom/client"
import ReactGA from "react-ga4"
import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from "@mui/material/styles"

import App from "./App"
import "./appGlobals"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "./styles/globals.less"
import "./styles/index.less"
import themeLight from "./theme/light"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    environment: process.env.REACT_APP_SCROLL_ENVIRONMENT,
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  })

  const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
  if (typeof GOOGLE_ANALYTICS_ID === "string") {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID)
    ReactGA.set({
      customBrowserType: !isMobile ? "desktop" : "web3" in window || "ethereum" in window ? "mobileWeb3" : "mobileRegular",
    })
  }
}

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
