import { motion } from "framer-motion"
import Img from "react-cool-img"

import { Box } from "@mui/material"

const MotionBox = motion(Box)

const NFTAvatar = props => {
  const { src, sx } = props

  return (
    <Box sx={{ position: "relative", ...sx }}>
      <MotionBox
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: "conic-gradient(from 70deg at 36.44% 52.76%, #FF684B 67.75817334651947deg, #FCE595 183.59999656677246deg, #4BFFE7 360deg)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ ease: "easeOut", duration: 4, repeat: Infinity }}
      ></MotionBox>
      <Img
        src={src}
        alt="NFT avatar"
        style={{ aspectRatio: "1 / 1", width: "100%", borderRadius: "0.8rem", objectFit: "contain" }}
        placeholder="/imgs/canvas/avatarPlaceholder.svg"
        error="/imgs/canvas/NFTCardPlaceholder.svg"
        retry={{ count: 2, delay: 1, acc: "*" }}
      ></Img>
    </Box>
  )
}

export default NFTAvatar
