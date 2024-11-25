import Img from "react-cool-img"

import { Stack, Typography } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const NFTCard = props => {
  const { name, collectionName, tokenId, imageUrl, sx, active, ...restProps } = props
  const { isMobile } = useCheckViewport()

  return (
    <Stack sx={{ width: "100%", flexDirection: ["row", "column"], gap: ["1.6rem", 0], alignItems: "center", ...sx }} {...restProps}>
      <Img
        src={imageUrl || "/imgs/canvas/NFTCardPlaceholder.svg"}
        alt={name}
        style={{
          aspectRatio: "1 / 1",
          width: isMobile ? "8rem" : "100%",
          borderRadius: "0.8rem",
          objectFit: "contain",
          ...(active ? { outline: "3px solid #fff", outlineOffset: "-3px" } : {}),
        }}
        placeholder="/imgs/canvas/badgePlaceholder.svg"
        error="/imgs/canvas/NFTCardPlaceholder.svg"
      ></Img>
      <Typography
        sx={{
          fontSize: ["1.6rem", "1.8rem"],
          lineHeight: ["2.4rem", "2.8rem"],
          fontWeight: 600,
          textAlign: ["left", "center"],
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "2",
          overflow: "hidden",
          color: "primary.contrastText",
          cursor: "inherit",
          mt: [0, "1.6rem"],
        }}
      >
        {name || `${collectionName} ${tokenId}`}
      </Typography>
    </Stack>
  )
}

export default NFTCard
