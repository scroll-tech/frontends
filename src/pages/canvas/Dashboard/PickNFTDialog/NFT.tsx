import { useEffect, useState } from "react"
import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"

const NFT = props => {
  const { name, collectionName, tokenId, imageUrl, sx, ...restProps } = props
  const [style, setStyle] = useState({})

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const isWide = img.width > img.height
      setStyle({
        width: isWide ? "100%" : "auto",
        height: isWide ? "auto" : "100%",
      })
    }
    img.src = imageUrl
  }, [imageUrl])

  return (
    <Box sx={{ width: "100%", cursor: "pointer", ...sx }} {...restProps}>
      <Stack alignItems="center" sx={{ aspectRatio: "1 / 1", width: "100%", borderRadius: "0.8rem", overflow: "hidden" }}>
        <Img src={imageUrl} alt={name} style={style} placeholder="/imgs/canvas/badgePlaceholder.svg"></Img>
      </Stack>
      <Typography
        sx={{
          fontSize: "1.8rem",
          lineHeight: "2.8rem",
          fontWeight: 600,
          textAlign: "center",
          // height: "5.6rem",
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

export default NFT
