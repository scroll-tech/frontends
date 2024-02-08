import type { Metadata } from "next"
import { headers } from "next/headers"
import React from "react"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

import GoogleAnalytics from "@/components/GoogleAnalytics"
import ScrollToTop from "@/components/ScrollToTop"
import SentrySetting from "@/components/SentrySetting"
import WebVitals from "@/components/WebVitals"
import { DEFAULT_METADATA } from "@/constants/route"
import RainbowProvider from "@/contexts/RainbowProvider"
import { VersionChecker } from "@/hooks/useVersionCheck"
import ScrollThemeProvider from "@/theme"
import { findCurrentRoute } from "@/utils/route"

import "./globals.css"

export async function generateMetadata(): Promise<Metadata> {
  const { pathname, origin } = new URL(headers().get("x-url")!)
  const route = findCurrentRoute(pathname)
  const title = `Scroll${route ? " – " + route.name : null}`
  const description = (route as any).description || DEFAULT_METADATA.description
  const ogImg = route.ogImg || DEFAULT_METADATA.ogImg
  const twitterImg = route.twitterImg || route.ogImg || DEFAULT_METADATA.ogImg

  return {
    metadataBase: new URL(origin),
    title,
    description,
    keywords: ["layer 2", "ethereum", "zero knowledge proof", "scalability", "ZKP", "l2", "EVM compatible", "zk rollup"],
    openGraph: {
      title,
      description,
      siteName: title,
      url: pathname,
      images: [ogImg],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title,
      description,
      images: [twitterImg],
    },
    icons: {
      apple: "/logo.png",
    },
    // See https://developers.google.com/web/fundamentals/web-app-manifest/
    manifest: "/manifest.json",
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_BASE_URI} crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700;8..144,800&display=swap"
          rel="stylesheet"
        />
        {/* TODO: only on blog detail page */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {/* <NextAppDirEmotionCacheProvider > */}
          <ScrollThemeProvider>
            <VersionChecker>
              <RainbowProvider>{children}</RainbowProvider>
            </VersionChecker>
            <ScrollToTop />
          </ScrollThemeProvider>
          {/* </NextAppDirEmotionCacheProvider> */}
        </AppRouterCacheProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <GoogleAnalytics></GoogleAnalytics>
            <WebVitals></WebVitals>
            <SentrySetting></SentrySetting>
          </>
        )}
      </body>
    </html>
  )
}
