import { Geist, Geist_Mono, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google"

// Glen's scroll.html (2026-09-10) sets the landing page in three faces: Instrument Serif for
// the display lines, Inter for everything else, JetBrains Mono for labels, the product rail
// and the model band. The legal pages already used the serif for their headings.
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
})

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-landing",
})

export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

// still the face of sign-up, the 404 and the legal shell
export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})
