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
  box-shadow: 2px 2px 10px 2px rgba(131, 131, 131, 0.4);
  background-color: rgba(249, 249, 249, 0.3);
  padding: 1rem;
  border-radius: 2rem;
  background-color: #fff;
  ${theme.breakpoints.down("sm")} {
    padding: 1.6rem;
  };
  .MuiAvatar-img{
    height: auto;
  }
`,
)

const IconBox = styled(Box)(
  ({ theme }) => `
  position: absolute;
  width: 100%;
  margin-left: -1rem;
  padding: 0 1rem;
  ${theme.breakpoints.down("sm")} {
    padding: 0 1.6rem;
    margin-left: -1.6rem;
  };
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
    item: { name, logo, tags, desc, website, twitterHandle },
  } = props

  const [isBack, setIsBack] = useState(false)

  const handleFlipCard = e => {
    setIsBack(preValue => !preValue)
  }

  const handleOpenTab = (e, item, { website, twitterHandle }) => {
    e.stopPropagation()
    const { name, prefixLink } = item
    if (name === "Twitter") {
      window.open(prefixLink + twitterHandle)
      return
    }
    window.open(website)
  }
  return (
    <Wrapper onClick={handleFlipCard} whileHover={{ translateY: "-2px", scale: 1.005 }}>
      <FlipCard animate={isBack ? "back" : "front"} variants={variants} transition={{ duration: 0.3, ease: "easeInOut" }}>
        <FaceSide
          className="front"
          whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <IconBox sx={{ display: "flex", justifyContent: "flex-end" }}>
            <InfoOutlined sx={{ color: "#686868" }}></InfoOutlined>
          </IconBox>
          <Stack direction="column" spacing={2} alignItems="center" sx={{ mt: "7rem" }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar alt={name} src={logo} variant="rounded" sx={{ width: 84, height: 84 }}></Avatar>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600, fontSize: ["2rem", "2.4rem"], width: "min-content" }}>{name}</Typography>
            </Stack>
            <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "center" }}>
              {tags ? tags.map(value => <Tag key={value}>{value.trim()}</Tag>) : null}
            </Stack>
          </Stack>
        </FaceSide>
        <FaceSide
          className="back"
          whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transform: "rotateY(180deg)" }}
        >
          <Stack direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Avatar alt={name} src={logo} variant="rounded" sx={{ width: 22, height: 22 }}></Avatar>
                <Typography sx={{ fontWeight: 600, fontSize: 12 }}>{name}</Typography>
              </Stack>
              <ReplayOutlined sx={{ color: "#686868" }}></ReplayOutlined>
            </Stack>
            <Typography
              sx={{ mb: "1rem", px: "1rem", lineHeight: ["1.8rem", "1.6rem"], fontFamily: "Inter", fontWeight: 500, fontSize: ["1.6rem", "1.4rem"] }}
            >
              {desc}
            </Typography>
            <Stack direction="row" spacing={[1, 0.5]} justifyContent="flex-end" sx={{ width: "100%" }}>
              {socialLinks.map(social => (
                <motion.span key={social.name} whileHover={{ scale: 1.1, color: "#686868" }} style={{ color: "#404040" }}>
                  <SvgIcon
                    onClick={e => handleOpenTab(e, social, { website, twitterHandle })}
                    component={social.icon}
                    sx={{ width: ["2.2rem", "2rem"], height: ["2.2rem", "2rem"], verticalAlign: "middle" }}
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
