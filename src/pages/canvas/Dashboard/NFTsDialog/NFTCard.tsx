import Img from "react-cool-img"

import { Box, Typography } from "@mui/material"

const NFTCard = props => {
  const { name, collectionName, tokenId, imageUrl, sx, active, ...restProps } = props

  return (
    <Box sx={{ width: "100%", ...sx }} {...restProps}>
      <Img
        src={imageUrl || "/imgs/canvas/NFTPlaceholder.svg"}
        alt={name}
        style={{
          aspectRatio: "1 / 1",
          width: "100%",
          borderRadius: "0.8rem",
          objectFit: "contain",
          ...(active ? { outline: "3px solid #fff", outlineOffset: "-3px" } : {}),
        }}
        placeholder="/imgs/canvas/badgePlaceholder.svg"
      ></Img>
      <Typography
        sx={{
          fontSize: "1.8rem",
          lineHeight: "2.8rem",
          fontWeight: 600,
          textAlign: "center",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "2",
          overflow: "hidden",
          color: "primary.contrastText",
          cursor: "inherit",
          mt: "1.6rem",
        }}
      >
        {name || `${collectionName} ${tokenId}`}
      </Typography>
    </Box>
  )
}

export default NFTCard
