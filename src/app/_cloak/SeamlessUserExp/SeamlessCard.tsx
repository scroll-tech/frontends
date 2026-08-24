import Image from "next/image"

import { Stack, Typography } from "@mui/material"

const SeamlessCard = props => {
  const { imageURL, title, content, sx } = props

  return (
    <Stack
      sx={{
        maxWidth: ["auto", "auto", "34rem"],
        pb: [0, 0, "2.4rem"],
        alignItems: "center",
        ...sx,
      }}
    >
      <Image src={imageURL} className="w-[18rem] h-[18rem] md:w-[22rem] md:h-[22rem]" alt={title} />
      <Typography
        sx={{
          typography: "title",
          fontSize: ["1.8rem", "1.8rem"],
          lineHeight: ["2.8rem", "2.8rem"],
          width: "100%",
          mb: "1.2rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: ["1.6rem", "1.6rem"],
          lineHeight: ["2.4rem", "2.4rem"],
        }}
      >
        {content}
      </Typography>
    </Stack>
  )
}

export default SeamlessCard
