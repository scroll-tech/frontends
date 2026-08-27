import Image from "next/image"

import { Box, Stack, Typography } from "@mui/material"

// translate-x-[-8px] translate-y-[-2px]
const StepCard = props => {
  const { imageURL, content, content2, backgroundColor } = props
  return (
    <Stack sx={{ alignItems: "center", position: "relative", width: "100%", py: [0, 0, "2rem"] }}>
      <Image src={imageURL} alt={content} className="relative h-[77px] w-auto md:h-[120px] md:absolute md:top-1/2 md:-translate-y-1/2 z-1" />
      <Stack
        direction={["column", "column", "row"]}
        sx={{
          width: "100%",
          position: "relative",
          justifyContent: "center",
          mt: ["-2.2rem", "-2.2rem", 0],
          alignItems: "center",
          pt: "3rem",
          pb: "2.5rem",
          borderRadius: "2rem",
          backgroundColor,

          gap: [0, 0, "15.4rem"],
        }}
      >
        <Typography
          sx={{
            fontSize: ["1.4rem", "2.2rem"],
            lineHeight: ["1.8rem", 1.4],
            fontWeight: 500,
            flex: 1,
            textAlign: ["center", "center", "right"],
          }}
        >
          {content}
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.4rem", "2.2rem"],
            lineHeight: ["1.8rem", 1.4],
            fontWeight: 500,
            flex: 1,
            textAlign: ["center", "center", "left"],
          }}
        >
          {content2}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default StepCard
