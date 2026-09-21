import { notFound } from "next/navigation"

import { isSepolia } from "@/utils/common"
import { genMeta } from "@/utils/route"

import LandingFooter from "../_components/LandingFooter"
import LandingNav from "../_components/LandingNav"
import { instrumentSerif, inter, jetbrainsMono } from "../_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Blog",
  description: "Announcements, technical write-ups and ecosystem news from the Scroll team.",
  relativeURL: "/blog",
}))

/**
 * The blog wears the new brand: the same nav and footer as the front page and the legal
 * pages, and the front page's three faces — Instrument Serif for the display lines, Inter
 * for the running text, JetBrains Mono for the labels. The legal shell sets Geist instead;
 * the blog sits next to the landing page, so it follows Glen's file (scroll.html,
 * 2026-09-10) rather than the legal type.
 */
export default function Layout({ children }) {
  if (isSepolia) {
    notFound()
  }
  return (
    <div
      className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable} flex min-h-screen w-full flex-col items-center gap-[32px] bg-white pt-[32px]`}
    >
      <div className="sticky top-[16px] z-50 w-full px-[16px]">
        <LandingNav />
      </div>
      <main className="w-full flex-1 pb-[80px]">{children}</main>
      <LandingFooter />
    </div>
  )
}
