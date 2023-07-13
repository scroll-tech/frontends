import { motion } from "framer-motion"
import { useState } from "react"
import Img from "react-cool-img"

import { Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ecosystemListLogoUrl } from "@/apis/ecosystem"
import RenderIfVisible from "@/components/RenderIfVisible"
import { ECOSYSTEM_SOCIAL_LIST } from "@/constants"

const Wrapper = styled(motion.div)(
  ({ theme }) => `
  position: relative;
  perspective: 1000px;
  width: 32.5rem;
  height: 32.5rem;
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
  padding: 2.5rem 3rem 3rem;
  border-radius: 2.5rem;
  background-color: ${theme.palette.themeBackground.dark};
  ${theme.breakpoints.down("sm")} {
    padding: 1.6rem;
  };
  .MuiAvatar-img{
    height: auto;
  }
`,
)

const Tag = styled("span")(
  ({ theme }) => `
  display: inline-block;
  color: ${theme.palette.primary.contrastText};
  background-color: ${theme.palette.themeBackground.tag};
  border-radius: 2rem;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: normal;
  margin: 0 5px;
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
    item: { name, hash, ext, tags, desc, website, twitterHandle },
  } = props
  const logo = ecosystemListLogoUrl + name + ext

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
    <RenderIfVisible defaultHeight={325}>
      <Wrapper onClick={handleFlipCard} whileHover={{ translateY: "-2px", scale: 1.005 }}>
        <FlipCard animate={isBack ? "back" : "front"} variants={variants} transition={{ duration: 0.3, ease: "easeInOut" }}>
          <FaceSide
            className="front"
            // whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Stack direction="column" spacing={2} alignItems="center" sx={{ pt: "4.5rem", height: "100%" }}>
              <Img alt={name} src={logo} placeholder={hash} width={70} height={70}></Img>
              <Typography sx={{ fontWeight: 600, fontSize: "2.4rem", lineHeight: "3rem", color: "#FFF8F3" }}>{name}</Typography>
              <Stack direction="row" justifyContent="center" flexWrap="wrap" flex={1} alignItems="end">
                {tags ? tags.map(value => <Tag key={value}>{value.trim()}</Tag>) : null}
              </Stack>
            </Stack>
          </FaceSide>
          <FaceSide
            className="back"
            // whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ transform: "rotateY(180deg)" }}
          >
            <Stack direction="column" sx={{ height: "100%" }}>
              <Typography sx={{ fontSize: "2.4rem", lineHeight: "3rem", fontWeight: 600, color: "#FFF8F3" }}>{name}</Typography>
              <Typography
                sx={{
                  mt: "1.8rem",
                  lineHeight: "normal",
                  fontSize: "2rem",
                  color: "#FFF8F3",
                }}
              >
                {desc}
              </Typography>
              <Stack direction="row" spacing="1.8rem" justifyContent="flex-end" alignItems="end" flex={1} sx={{ width: "100%" }}>
                {ECOSYSTEM_SOCIAL_LIST.map(social => (
                  <motion.span key={social.name} whileHover={{ scale: 1.1 }}>
                    <SvgIcon
                      onClick={e => handleOpenTab(e, social, { website, twitterHandle })}
                      component={social.icon}
                      sx={{
                        width: ["2.2rem", "2rem"],
                        height: ["2.2rem", "2rem"],
                        verticalAlign: "middle",
                        color: theme => theme.palette.primary.contrastText,
                      }}
                      inheritViewBox
                    ></SvgIcon>
                  </motion.span>
                ))}
              </Stack>
            </Stack>
          </FaceSide>
        </FlipCard>
      </Wrapper>
    </RenderIfVisible>
  )
}

export default GalleryItem
