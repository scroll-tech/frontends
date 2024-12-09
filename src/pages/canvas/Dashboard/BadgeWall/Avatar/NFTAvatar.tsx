import { motion } from "framer-motion"
import { useState } from "react"
import Img from "react-cool-img"

import { Box, Stack } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const MotionBox = motion(Box)

const NFTAvatar = props => {
  const { src, sx, imgStyle } = props
  const { isMobile } = useCheckViewport()

  const [layoutStyle, setLayoutStyle] = useState({ width: "100%", height: "auto" })
  const [loaded, setLoaded] = useState(false)

  const handleLoadNFTImage = event => {
    const { naturalWidth, naturalHeight } = event.target
    setLoaded(true)

    if (naturalWidth > naturalHeight) {
      setLayoutStyle({ width: "100%", height: "auto" })
    } else {
      setLayoutStyle({ width: "auto", height: "100%" })
    }
  }

  return (
    <Box sx={{ position: "relative", width: "100%", ...sx }}>
      <MotionBox
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -2,
          background: "conic-gradient(from 70deg at 36.44% 52.76%, #FF684B 67.75817334651947deg, #FCE595 183.59999656677246deg, #4BFFE7 360deg)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ ease: "easeOut", duration: 4, repeat: Infinity }}
      ></MotionBox>
      {loaded && (
        <Box
          sx={{
            position: "absolute",
            width: "83.33%",
            height: "83.33%",
            zIndex: -1,
            background: "#101010",
            filter: "blur(40px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></Box>
      )}

      <Stack justifyContent="center" alignItems="center" sx={{ width: "100%", aspectRatio: "1/1" }}>
        <Img
          src={src}
          alt="NFT avatar"
          style={{ borderRadius: isMobile ? "0.8rem" : "2.4rem", ...imgStyle, ...layoutStyle }}
          placeholder="/imgs/canvas/avatarPlaceholder.svg"
          error="/imgs/canvas/NFTCardPlaceholder.svg"
          retry={{ count: 2, delay: 1, acc: "*" }}
          onLoad={handleLoadNFTImage}
        ></Img>
      </Stack>
    </Box>
  )
}

export default NFTAvatar
