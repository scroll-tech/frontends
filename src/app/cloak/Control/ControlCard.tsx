import Image from "next/image"

import { Stack, Typography } from "@mui/material"

const ControlCard = props => {
  const { Icon, title, content, sx } = props

  return (
    <Stack
      sx={{
        gap: "1.2rem",
        py: "3rem",
        px: "2.4rem",
        borderRadius: "2rem",
        ...sx,
      }}
    >
      <Icon></Icon>
      <Typography
        sx={{
          typography: "title",
          fontSize: ["1.8rem", "1.8rem"],
          lineHeight: ["2.8rem", "2.8rem"],
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2.2rem", "2.4rem"],
        }}
      >
        {content}
      </Typography>
    </Stack>
  )
}

export default ControlCard
