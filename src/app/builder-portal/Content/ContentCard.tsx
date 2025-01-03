import Link from "next/link"

import { Stack, Typography } from "@mui/material"

const ContentCard = props => {
  const { icon: IconSvg, title, description, href, upcoming } = props

  return (
    <Link href={href ?? ""} target={href?.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer">
      <Stack
        direction="column"
        sx={{
          backgroundColor: "themeBackground.light",
          borderRadius: "2.4rem",
          p: "3rem",
          height: "100%",
          opacity: upcoming ? 0.6 : 1,
        }}
      >
        <IconSvg className="w-[2.4rem] h-auto"></IconSvg>
        <Typography sx={{ fontSize: "2rem", fontWeight: 500, lineHeight: "normal", mt: "2rem", mb: "0.8rem", cursor: "inherit" }}>{title}</Typography>
        <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.2rem", cursor: "inherit" }}>{description}</Typography>
      </Stack>
    </Link>
  )
}

export default ContentCard
