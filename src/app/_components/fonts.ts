import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

// still used by the legal pages (privacy policy / terms)
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
})

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

// display face for the landing page — headlines, section rail, numerals
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})
