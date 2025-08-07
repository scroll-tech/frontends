import Image from "next/image"
import Link from "next/link"

import { Chip, Stack, Typography } from "@mui/material"

const NativeAssetCard = props => {
  const { imageURL, name, href, description } = props

  return (
    <Link href={href} className="flex-1">
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          position: "relative",
          borderRadius: "1.6rem",
          backgroundColor: "themeBackground.light",
          p: "1.6rem",
          "&:hover": {
            backgroundColor: "themeBackground.normal",
          },
        }}
      >
        <Chip
          label="Coming Soon"
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",

            p: "4px 8px",
            height: "min-content",
            backgroundColor: "background.default",
            borderRadius: "4px",
            "& .MuiChip-label": {
              fontSize: "1.2rem",
              lineHeight: "1.6rem",
              p: 0,
              fontWeight: 500,
            },
          }}
        ></Chip>
        <Image src={imageURL} width={64} height={64} className="w-[3.2rem] sm:w-[6.4rem] aspect-square" alt={name}></Image>
        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontWeight: 600, mt: "1.6rem", cursor: "inherit" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], cursor: "inherit", textAlign: "center" }}>
          {description}
        </Typography>
      </Stack>
    </Link>
  )
}

export default NativeAssetCard
