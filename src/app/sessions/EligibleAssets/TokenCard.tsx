import Image from "next/image"
import Link from "next/link"

import { Stack, Typography } from "@mui/material"

const TokenCard = props => {
  const { name, logoURI, href, narrow } = props
  return (
    <Link href={href} target={href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer">
      <Stack
        direction="column"
        spacing="8px"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: ["9.2rem", "10.4rem"],
          p: narrow ? ["0.8rem", "0.8rem 1.6rem"] : ["0.8rem", "1.6rem"],
          borderRadius: "1.6rem",
          backgroundColor: "themeBackground.light",
          "&:hover": {
            backgroundColor: "themeBackground.normal",
          },
        }}
      >
        <Image src={logoURI} className="rounded-full w-[3.2rem] sm:w-[4rem] aspect-square" width={40} height={40} alt={name}></Image>
        <Typography
          sx={{
            fontSize: narrow ? ["1rem", "1.2rem"] : ["1.4rem", "1.6rem"],
            lineHeight: narrow ? "1.6rem" : ["2rem", "2.4rem"],
            fontWeight: 600,
            textAlign: "center",
            cursor: "inherit",
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  )
}

export default TokenCard
