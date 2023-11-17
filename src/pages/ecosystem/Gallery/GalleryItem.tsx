import { motion } from "framer-motion"
import { useState } from "react"
import Img from "react-cool-img"
import { makeStyles } from "tss-react/mui"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ecosystemListLogoUrl } from "@/apis/ecosystem"
import { ReactComponent as InfoIcon } from "@/assets/svgs/ecosystem/info.svg"
import RenderIfVisible from "@/components/RenderIfVisible"
import { ECOSYSTEM_SOCIAL_LIST } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import NetworkLabel from "./NetworkLabel"

const useStyles = makeStyles()(theme => ({
  renderWrapper: {
    aspectRatio: "1 / 1",
    width: "100%",
  },
  wrapper: {
    position: "relative",
    perspective: "1000px",
    width: "100%",
    height: "100%",
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
    borderRadius: "2.5rem",
    backgroundColor: theme.palette.themeBackground.normal,

    ".MuiAvatarImg": {
      height: "auto",
    },
  },
  front: {
    padding: "2rem 2rem 3rem",

    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 2rem 0 4.5rem",
    },
  },
  back: {
    padding: "2.5rem 3rem 3rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.6rem 2rem",
    },
  },
  info: {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
    fontSize: "2rem",
  },
  frontContent: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(2, min-content) 1fr",
    justifyItems: "center",
    gridRowGap: "2rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "min-content 1fr",
      gridTemplateRows: "repeat(2, min-content)",
      paddingTop: 0,
      gridColumnGap: "2rem",
      gridRowGap: "1rem",
      justifyItems: "start",
      height: "auto",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  descriptionBox: {
    flex: 1,
    [theme.breakpoints.up("sm")]: {
      overflowY: "auto",
      paddingRight: "0.4rem",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(209, 205, 204, 0.30)",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      // Firefox
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "1rem",
    },
  },
  tagWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "end",
    margin: "-4px -5px",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      alignItems: "start",
      margin: "-4px",
      justifyContent: "flex-start",
    },
  },
  tag: {
    display: "inline-block",
    color: "#C58D49",
    backgroundColor: theme.palette.themeBackground.highlight,
    borderRadius: "2rem",
    padding: "6px 12px",
    fontWeight: "500",
    fontSize: "1.6rem",
    lineHeight: "normal",
    margin: "4px 5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      padding: "2px 12px",
      margin: "4px",
    },
  },
  networkLabel: {
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateY(-50%)",
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
    item: { name, hash, ext, tags, desc, website, twitterHandle, networkLabel },
  } = props
  const logo = ecosystemListLogoUrl + name + ext
  const { classes, cx } = useStyles()

  const { isMobile } = useCheckViewport()

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
    <RenderIfVisible defaultHeight={isMobile ? 150 : 0} rootElementClass={classes.renderWrapper}>
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
            <NetworkLabel className={classes.networkLabel} primary={networkLabel === "Mainnet"}>
              {networkLabel}
            </NetworkLabel>
            {isMobile && <SvgIcon className={classes.info} component={InfoIcon} inheritViewBox></SvgIcon>}
            <Box className={classes.frontContent}>
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: ["6rem", "7rem"],
                  height: ["6rem", "7rem"],
                  backgroundColor: "background.paper",
                  borderRadius: "3.5rem",
                  overflow: "hidden",
                  gridRow: ["span 2", "unset"],
                  alignSelf: "center",
                }}
              >
                <Img alt={name} src={logo} placeholder={hash} width={isMobile ? 60 : 70} height={isMobile ? 60 : 70}></Img>
              </Stack>
              <Typography sx={{ fontWeight: 600, fontSize: ["2rem", "2.4rem"], lineHeight: "3rem", color: theme => theme.palette.text.primary }}>
                {name}
              </Typography>
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
            <NetworkLabel className={classes.networkLabel} primary={networkLabel === "Mainnet"}>
              {networkLabel}
            </NetworkLabel>

            <Stack direction="column" sx={{ height: "100%" }}>
              <Typography
                sx={{
                  fontSize: "2.4rem",
                  lineHeight: "3rem",
                  fontWeight: 600,
                  color: theme => theme.palette.text.primary,
                  mb: "1.8rem",
                  display: ["none", "inline-block"],
                }}
              >
                {name}
              </Typography>
              <Box className={classes.descriptionBox}>
                <Typography
                  sx={{
                    lineHeight: "normal",
                    fontSize: ["1.6rem", "2rem"],
                    color: theme => theme.palette.text.primary,
                    "@media (max-width: 600px)": {
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      height: "7.8rem",
                    },
                  }}
                >
                  {desc}
                </Typography>
              </Box>

              <Stack direction="row" spacing="1.8rem" justifyContent="flex-end" sx={{ width: "100%", mt: [0, "0.8rem"] }}>
                {ECOSYSTEM_SOCIAL_LIST.map(social => (
                  <motion.span key={social.name} whileHover={{ scale: 1.1 }}>
                    <SvgIcon
                      onClick={e => handleOpenTab(e, social, { website, twitterHandle })}
                      component={social.icon}
                      sx={{
                        fontSize: "1.8rem",
                        verticalAlign: "middle",
                        color: theme => theme.palette.text.primary,
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
