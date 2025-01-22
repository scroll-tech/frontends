"use client"

import { sendGAEvent } from "@next/third-parties/google"
import { useReportWebVitals } from "next/web-vitals"

const WebVitals = () => {
  useReportWebVitals(metric => {
    sendGAEvent("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    })
  })
  return null
}

export default WebVitals
