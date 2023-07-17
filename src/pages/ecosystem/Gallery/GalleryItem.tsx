import { motion } from "framer-motion"
import { useState } from "react"
import Img from "react-cool-img"
import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ecosystemListLogoUrl } from "@/apis/ecosystem"
import { ReactComponent as InfoIcon } from "@/assets/svgs/refactor/info.svg"
import RenderIfVisible from "@/components/RenderIfVisible"
import { ECOSYSTEM_SOCIAL_LIST } from "@/constants"

const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: "relative",
    perspective: "1000px",
    width: "32.5rem",
    height: "32.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },
  flipCard: {
    position: "relative",
    transformStyle: "preserve-3d",
    width: "100%",
    height: "100%",
  },
  faceSide: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    padding: "2.5rem 3rem 3rem",
    borderRadius: "2.5rem",
    backgroundColor: theme.palette.themeBackground.dark,

    ".MuiAvatarImg": {
      height: "auto",
    },
  },
  front: {
    [theme.breakpoints.down("sm")]: {
      padding: "4.5rem 1rem 4.5rem 4.5rem",
    },
  },
  back: {
    [theme.breakpoints.down("sm")]: {
      padding: "1.6rem 2rem",
    },
  },
  info: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    fontSize: "2rem",
  },
  girdBox: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(2, min-content) 1fr",
    paddingTop: "4.5rem",
    height: "100%",
    justifyItems: "center",
    gridRowGap: "2rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "min-content 1fr",
      gridTemplateRows: "min-content 1fr",
      paddingTop: 0,
      gridColumnGap: "2rem",
      gridRowGap: "1rem",
      justifyItems: "start",
    },
  },
  tagWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "end",
    [theme.breakpoints.down("sm")]: {
      alignItems: "start",
      marginLeft: "-4px",
      marginRight: "-4px",
      justifyContent: "flex-start",
    },
  },
  tag: {
    display: "inline-block",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.themeBackground.tag,
    borderRadius: "2rem",
    padding: "6px 12px",
    fontWeight: "500",
    fontSize: "1.6rem",
    lineHeight: "normal",
    margin: "0 5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      padding: "2px 12px",
      margin: "0 4px",
    },
  },
}))

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
  const { classes, cx } = useStyles()

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
    <RenderIfVisible defaultHeight={isMobileOnly ? 150 : 325}>
      <motion.div className={classes.wrapper} onClick={handleFlipCard} whileHover={{ translateY: "-2px", scale: 1.005 }}>
        <motion.div
          className={classes.flipCard}
          animate={isBack ? "back" : "front"}
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className={cx(classes.faceSide, classes.front)}
            // whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isMobileOnly && <SvgIcon className={classes.info} component={InfoIcon} inheritViewBox></SvgIcon>}
            <Box className={classes.girdBox}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: ["6rem", "7rem"],
                  height: ["6rem", "7rem"],
                  backgroundColor: theme => theme.palette.background.paper,
                  borderRadius: "3.5rem",
                  overflow: "hidden",
                  gridRow: ["span 2", "unset"],
                }}
              >
                <Img alt={name} src={logo} placeholder={hash} width={isMobileOnly ? 60 : 70} height={isMobileOnly ? 60 : 70}></Img>
              </Stack>
              <Typography sx={{ fontWeight: 600, fontSize: ["2rem", "2.4rem"], lineHeight: "3rem", color: "#FFF8F3" }}>{name}</Typography>
              <Box className={classes.tagWrapper}>
                {tags
                  ? tags.map(value => (
                      <span className={classes.tag} key={value}>
                        {value.trim()}
                      </span>
                    ))
                  : null}
              </Box>
            </Box>
          </motion.div>
          <motion.div
            className={cx(classes.faceSide, classes.back)}
            // whileHover={{ boxShadow: "2px 2px 10px 2px rgba(131, 131, 131, 0.5)" }}
            // transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ transform: "rotateY(180deg)" }}
          >
            <Stack direction="column" sx={{ height: "100%" }}>
              <Typography
                sx={{ fontSize: "2.4rem", lineHeight: "3rem", fontWeight: 600, color: "#FFF8F3", mb: "1.8rem", display: ["none", "inline-block"] }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  lineHeight: "normal",
                  fontSize: ["1.6rem", "2rem"],
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
                        fontSize: "1.8rem",
                        verticalAlign: "middle",
                        color: theme => theme.palette.primary.contrastText,
                      }}
                      inheritViewBox
                    ></SvgIcon>
                  </motion.span>
                ))}
              </Stack>
            </Stack>
          </motion.div>
        </motion.div>
      </motion.div>
    </RenderIfVisible>
  )
}

export default GalleryItem
