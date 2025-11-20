import Image from "next/image"

import { Stack, Typography } from "@mui/material"

const SeamlessCard = props => {
  const { imageURL, title, content, sx } = props

  return (
    <Stack
      sx={{
        gap: "1.2rem",
        maxWidth: "270px",
        ...sx,
      }}
    >
      <Stack sx={{ alignItems: "center" }}>
        <Image src={imageURL} className="w-[18rem] h-[18rem]" alt={title} />
        <Typography
          sx={{
            typography: "title",
            fontSize: ["1.8rem", "1.8rem"],
            lineHeight: ["2.8rem", "2.8rem"],
            width: "100%",
          }}
        >
          {title}
        </Typography>
      </Stack>
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

export default SeamlessCard
