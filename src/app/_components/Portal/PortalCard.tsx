"use client"

import { sendGAEvent } from "@next/third-parties/google"

import { Stack, Typography } from "@mui/material"

const PortalCard = props => {
  const { label, content, children } = props

  const handleSendGAEvent = () => {
    sendGAEvent("event", "click_landing", {
      label,
    })
  }

  return (
    <Stack
      role="button"
      direction="column"
      sx={{ p: "2.4rem", pt: "4rem", backgroundColor: "background.default", borderRadius: "2rem" }}
      onClick={handleSendGAEvent}
    >
      {children}
      <Typography sx={{ typography: "title", fontSize: "2rem", lineHeight: "4rem", mt: "1.6rem", cursor: "inherit" }}>{label}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: ["2.4rem", "2.8rem"], height: ["4.8rem", "5.6rem"], cursor: "inherit" }}>
        {content}
      </Typography>
    </Stack>
  )
}
export default PortalCard
