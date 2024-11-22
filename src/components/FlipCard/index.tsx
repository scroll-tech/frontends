import { motion, useCycle } from "framer-motion"

import { Box } from "@mui/material"

const MotionBox = motion(Box)

const FlipCard = props => {
  const { sx, frontContent, backContent } = props
  const [isFlipped, setIsFlipped] = useCycle(false, true)
  return (
    <Box sx={{ perspective: "1000px", ...sx }}>
      <MotionBox
        onClick={() => setIsFlipped()}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 1s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Box sx={{ position: "absolute", backfaceVisibility: "hidden", transform: "rotateY(0deg)", width: "100%", height: "100%" }}>
          {frontContent}
        </Box>
        <Box sx={{ position: "absolute", backfaceVisibility: "hidden", transform: "rotateY(180deg)", width: "100%", height: "100%" }}>
          {backContent}
        </Box>
      </MotionBox>
    </Box>
  )
}

export default FlipCard
