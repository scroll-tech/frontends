import { Geist, Instrument_Serif } from "next/font/google"

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
