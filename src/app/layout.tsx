import { GoogleAnalytics } from "@next/third-parties/google"
import { Metadata } from "next"
import React, { Suspense } from "react"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

import GlobalComponents from "@/components/GlobalComponents"
// import GoogleAnalytics from "@/components/GoogleAnalytics"
import ScrollToTop from "@/components/ScrollToTop"
import WebVitals from "@/components/WebVitals"
// import SentrySetting from "@/components/SentrySetting"
import { ROOT_METADATA } from "@/constants/route"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import CanvasContextProvider from "@/contexts/CanvasContextProvider"
import RainbowProvider from "@/contexts/RainbowProvider"
import { VersionChecker } from "@/hooks/useVersionCheck"
import ScrollThemeProvider from "@/theme"

import "./globals.css"

export const metadata: Metadata = ROOT_METADATA

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ScrollThemeProvider>
            <VersionChecker>
              <RainbowProvider>
                <BridgeContextProvider>
                  <CanvasContextProvider>{children}</CanvasContextProvider>
                  <GlobalComponents></GlobalComponents>
                </BridgeContextProvider>
              </RainbowProvider>
            </VersionChecker>
            <ScrollToTop />
          </ScrollThemeProvider>
        </AppRouterCacheProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <Suspense fallback={null}>
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
            </Suspense>
            <WebVitals></WebVitals>
            {/* <SentrySetting></SentrySetting> */}
          </>
        )}
      </body>
    </html>
  )
}
