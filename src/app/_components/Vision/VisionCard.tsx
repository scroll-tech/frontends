import Image from "next/image"

import { Stack, Typography } from "@mui/material"

const VisionCard = props => {
  const { icon, title, content } = props
  return (
    <Stack
      sx={{ height: ["40rem", "48rem"], p: "2.4rem", gap: "1.6rem", backgroundColor: "themeBackground.light", borderRadius: "2.4rem" }}
      direction="column"
    >
      <Image src={icon} alt={title} className="self-end"></Image>
      <Typography sx={{ whiteSpace: "pre-line", fontSize: "2.8rem", lineHeight: "38px", mt: "auto" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem" }}>{content}</Typography>
    </Stack>
  )
}

export default VisionCard
