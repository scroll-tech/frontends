import Image from "next/image"

import { Stack, Typography } from "@mui/material"

const VisionCard = props => {
  const { icon, title, content } = props
  return (
    <Stack
      sx={{ height: ["40rem", "48rem"], p: "2.4rem", gap: "1.6rem", backgroundColor: "themeBackground.light", borderRadius: "2.4rem" }}
      direction="column"
    >
      <Image src={icon} alt={title} className="self-end mt-[8px]"></Image>
      <Typography
        sx={{
          whiteSpace: ["nowrap", "pre-line"],
          fontSize: ["20px", "28px"],
          lineHeight: ["32px", "38px"],
          mt: "auto",
          typography: "title",
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: ["16px", "18px"], lineHeight: ["24px", "28px"], height: ["9.6rem", "11.2rem"] }}>{content}</Typography>
    </Stack>
  )
}

export default VisionCard
