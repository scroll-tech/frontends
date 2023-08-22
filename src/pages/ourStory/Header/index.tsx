import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, Stack, Typography } from "@mui/material"

import OrientationToView from "@/components/Motion/OrientationToView"

const useStyles = makeStyles()(theme => ({
  bg: {
    width: "100%",
    height: "100vh",
    marginTop: "-6.5rem",
    paddingTop: "16.4rem",
    background: "url(/imgs/story/story-hero-bg-desktop.svg) no-repeat center",
    backgroundSize: "cover",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      background: " url(/imgs/story/story-hero-bg-mobile.svg) no-repeat center",
      backgroundSize: "cover",
    },
  },
  mask: {
    width: "84rem",
    height: "26rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    margin: "0 auto",
    background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.primary.contrastText} 44%, transparent 100%)`,

    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 1.6rem)",
      height: "unset",
      aspectRatio: "1 / 1",
      background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.themeBackground.light} 56%, transparent 100%)`,
    },
  },
}))

const Header = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.bg}>
      <Stack direction="column" spacing={isMobileOnly ? "1.2rem" : "1.4rem"} alignItems="center">
        <OrientationToView>
          <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: 1, fontWeight: 600 }}>Our story</Typography>
        </OrientationToView>
        <OrientationToView delay={0.3}>
          <Typography sx={{ fontSize: ["2rem", "2.6rem"], maxWidth: ["24.8rem", "68rem"] }}>
            We are pragmatic problem solvers, passionate community builders and champions of open-source code.
          </Typography>
        </OrientationToView>
      </Stack>
    </Box>
  )
}

export default Header
