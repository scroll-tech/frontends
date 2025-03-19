import { GoogleAnalytics } from "@next/third-parties/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import clsx from "clsx"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import localFont from "next/font/local"
import React, { Suspense } from "react"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"

import GlobalComponents from "@/components/GlobalComponents"
import ScrollToTop from "@/components/ScrollToTop"
import WebVitals from "@/components/WebVitals"
import { ROOT_METADATA } from "@/constants/route"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import RainbowProvider from "@/contexts/RainbowProvider"
import { VersionChecker } from "@/hooks/useVersionCheck"
import ScrollThemeProvider from "@/theme"

import "./globals.css"

export const metadata: Metadata = ROOT_METADATA

// same as scroll documnet
const robotoFont = Roboto({
  variable: "--font-developer",
  weight: ["400", "500", "700"],
  display: "swap",
  subsets: ["latin"],
})

const titleFont = localFont({
  src: [
    {
      path: "../assets/fonts/FTPolarSemiMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/FTPolarSemiMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-title",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" /> */}
      </head>
      <body className={clsx(titleFont.variable, robotoFont.variable)}>
        <InitColorSchemeScript attribute="class"></InitColorSchemeScript>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ScrollThemeProvider>
            <VersionChecker>
              <RainbowProvider>
                <BridgeContextProvider>
                  {children}
                  <GlobalComponents></GlobalComponents>
                </BridgeContextProvider>
              </RainbowProvider>
            </VersionChecker>
            <ScrollToTop />
          </ScrollThemeProvider>
        </AppRouterCacheProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <SpeedInsights sampleRate={0.8}></SpeedInsights>
            <Suspense fallback={null}>
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
            </Suspense>
            <WebVitals></WebVitals>
          </>
        )}
      </body>
    </html>
  )
}
