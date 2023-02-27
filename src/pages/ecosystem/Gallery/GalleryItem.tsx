import { motion } from "framer-motion"
import { useState } from "react"

import { InfoOutlined, ReplayOutlined } from "@mui/icons-material"
import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { socialLinks } from "../helper"

const Wrapper = styled(motion.div)(
  ({ theme }) => `
  position: relative;
  perspective: 1000px;
  margin: 2rem;
  width: 30rem;
  height: 30rem;
  ${theme.breakpoints.down("sm")} {
    width: 100%;
    margin: 1rem 0;
  };
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

const FaceSide = styled(motion.div)(
  ({ theme, className }) => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  box-shadow: 2px 2px 10px 2px rgba(221, 221, 221, 0.5);
  background-color: rgba(249, 249, 249, 0.3);
  padding: 1rem;
  border-radius: 2rem;
  background-color: #fff;
  .MuiAvatar-img{
    height: auto;
  }
`,
)

const Tag = styled("span")(
  ({ theme }) => `
  display: inline-block;
  color: #eee;
  background-color: #404040;
  border-radius: 6px;
  padding: 4px 6px;
  font-weight: 900;
  font-size: 12px;
  margin: 4px;
`,
)

const variants = {
  front: { transform: "rotateY(0deg)" },
  back: {
    transform: "rotateY(180deg)",
  },
}

const GalleryItem = props => {
  const {
    item: { Name, Logo, Tag: tag, ShortDescription, Website, TwitterHandle },
  } = props

  const [isBack, setIsBack] = useState(false)

  const handleFlipCard = e => {
    setIsBack(preValue => !preValue)
  }

  const handleOpenTab = (e, item, { Website, TwitterHandle }) => {
    e.stopPropagation()
    const { name, prefixLink } = item
    if (name === "Twitter") {
      window.open(prefixLink + TwitterHandle)
      return
    }
    window.open(Website)
  }
  return (
    <Wrapper onClick={handleFlipCard} whileHover={{ translateY: "-2px", scale: 1.005 }}>
      <FlipCard animate={isBack ? "back" : "front"} variants={variants} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <FaceSide
          className="front"
          whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.4)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <InfoOutlined sx={{ color: "#686868" }}></InfoOutlined>
          </Box>
          <Stack direction="column" spacing={2} alignItems="center" sx={{ mt: "7rem" }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar alt={Name} src={Logo} variant="rounded" sx={{ width: 84, height: 84 }}></Avatar>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600, fontSize: ["2rem", "2.4rem"], width: "min-content" }}>{Name}</Typography>
            </Stack>
            <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "center" }}>
              {tag ? tag.split(",").map(value => <Tag key={value}>{value.trim()}</Tag>) : null}
            </Stack>
          </Stack>
        </FaceSide>
        <FaceSide
          className="back"
          whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.4)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transform: "rotateY(180deg)" }}
        >
          <Stack direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Avatar alt={Name} src={Logo} variant="rounded" sx={{ width: 22, height: 22 }}></Avatar>
                <Typography sx={{ fontWeight: 600, fontSize: 12 }}>{Name}</Typography>
              </Stack>
              <ReplayOutlined sx={{ color: "#686868" }}></ReplayOutlined>
            </Stack>
            <Typography
              sx={{ mt: "2rem", px: "1rem", lineHeight: ["1.8rem", "1.6rem"], fontFamily: "Inter", fontWeight: 500, fontSize: ["1.6rem", "1.4rem"] }}
            >
              {ShortDescription}
            </Typography>
            <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ width: "100%" }}>
              {socialLinks.map(social => (
                <motion.span key={social.name} whileHover={{ scale: 1.1, color: "#686868" }} style={{ color: "#404040" }}>
                  <SvgIcon
                    onClick={e => handleOpenTab(e, social, { Website, TwitterHandle })}
                    component={social.icon}
                    sx={{ width: "2rem", height: "2rem" }}
                    viewBox={social.viewBox}
                  ></SvgIcon>
                </motion.span>
              ))}
            </Stack>
          </Stack>
        </FaceSide>
      </FlipCard>
    </Wrapper>
  )
}

export default GalleryItem
