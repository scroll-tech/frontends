"use client"

import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  container: {
    height: "calc(100vh - 6.5rem)",
    background: theme.vars.palette.themeBackground.normal,
    "& > .MuiBox-root": {
      background: theme.vars.palette.themeBackground.normal,
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, min-content)",
    rowGap: "2.4rem",
    columnGap: "4rem",
    paddingTop: "5% !important",
    paddingBottom: "5.4rem",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr",
      gap: "2rem",
      paddingTop: "7.3rem",
      paddingBottom: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5rem",
      paddingBottom: "2rem",
      justifyItems: "center",
    },
  },
  titleWrapper: {
    [theme.breakpoints.up("sm")]: {
      gridRow: "span 2",
    },
  },
  subTitleWrapper: {
    width: "68rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "68rem",
    },
  },
  actionGroup: {
    marginTop: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()
  return (
    <Box className={classes.container}>
      <SectionWrapper className={classes.root}>
        <OrientationToView className={classes.titleWrapper}>
          <Typography
            sx={{
              fontSize: ["3.6rem", "6.4rem"],
              lineHeight: ["5rem", "8.5rem"],
              fontWeight: 600,
              textAlign: ["center", "left"],
              width: "max-content",
            }}
          >
            Join us
          </Typography>
        </OrientationToView>

        <OrientationToView className={classes.subTitleWrapper}>
          <Typography
            sx={{
              fontSize: ["2rem", "2.6rem"],
              lineHeight: 1.4,
              textAlign: ["center", "left"],
            }}
          >
            Join a group of cryptography researchers, engineers, experts, and community champions to create the best L2 Ethereum ecosystem.
          </Typography>
        </OrientationToView>
        <OrientationToView delay={0.3} className={classes.actionGroup}>
          <Button href="https://boards.greenhouse.io/scrollio" target="_blank" color="primary" width={isMobile ? "21rem" : "25rem"}>
            View open positions
          </Button>
        </OrientationToView>
        <Box
          sx={{
            width: ["100%", "55rem"],
            aspectRatio: "5 / 4",
            gridColumn: "-2 / -1",
            background: "url(/imgs/career/career-header-bg.webp) center / contain no-repeat",
          }}
        ></Box>
      </SectionWrapper>
    </Box>
  )
}

export default Header
