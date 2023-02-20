import { motion } from "framer-motion"
import { useState } from "react"

import { InfoOutlined, ReplayOutlined } from "@mui/icons-material"
import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { socialLinks } from "../helper"

const Wrapper = styled("div")(
  ({ theme }) => `
  position: relative;
  perspective: 1000px;
  margin: 2rem;
  width: 300px;
  height: 300px;
`,
)

const FlipCard = styled(motion.div)(
  ({ theme }) => `
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  `,
)

const FaceSide = styled("div")(
  ({ theme, className }) => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 2px 2px 10px 2px rgba(174, 174, 174, 0.25);
  background-color: ${className?.includes("back") ? "#deeafd" : "rgba(249, 249, 249, 0.3)"};
  padding: 1rem;
  border-radius: 2rem;

  .MuiAvatar-img{
    height: auto;
  }
`,
)

const Tag = styled("span")(
  ({ theme }) => `
  color: #686868;
  font-weight: 700;
  font-size: 12px
`,
)

const variants = {
  front: { transform: "rotateY(0deg)" },
  back: {
    transform: "rotateY(180deg)",
  },
}

const GallaryItem = props => {
  const {
    item: {
      Name,
      Logo,
      Tag: tag,
      ShortDescription,
      // Website, TwitterHandle
    },
  } = props

  const [isBack, setIsBack] = useState(false)

  const handleFlipCard = () => {
    setIsBack(preValue => !preValue)
  }
  return (
    <Wrapper onClick={handleFlipCard}>
      <FlipCard animate={isBack ? "back" : "front"} variants={variants} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <FaceSide className="front">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <InfoOutlined sx={{ color: "#686868" }}></InfoOutlined>
          </Box>
          <Stack direction="column" spacing={2} alignItems="center" sx={{ mt: "2rem" }}>
            <Avatar alt={Name} src={Logo} variant="square" sx={{ width: 120, height: 120 }}></Avatar>
            <Typography variant="h5">{Name}</Typography>
            <Stack direction="row" spacing={1}>
              {tag?.split(",").map(value => (
                <Tag>{value}</Tag>
              ))}
            </Stack>
          </Stack>
        </FaceSide>
        <FaceSide className="back" style={{ transform: "rotateY(180deg)" }}>
          <Stack direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ReplayOutlined sx={{ color: "#686868" }}></ReplayOutlined>
            </Box>
            <Typography variant="body2" sx={{ mt: "2rem", px: "1rem" }}>
              {ShortDescription}
            </Typography>
            {/* <Box sx={{ textAlign: "center" }}> */}
            <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ width: "100%" }}>
              {socialLinks.map(item => (
                <motion.div whileHover={{ scale: 1.1, color: "#686868" }} style={{ color: "#404040" }}>
                  <SvgIcon component={item.icon} viewBox={item.viewBox}></SvgIcon>
                </motion.div>
              ))}
            </Stack>
          </Stack>
        </FaceSide>
      </FlipCard>
    </Wrapper>
  )
}

export default GallaryItem
