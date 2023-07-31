import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, Stack, Typography } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  bg: {
    width: "100vw",
    height: "100vh",
    marginTop: "-6.5rem",
    background: "url(/imgs/story/story-bg.png) no-repeat center",
    backgroundSize: "cover",
    textAlign: "center",
  },
  mask: {
    width: "84rem",
    height: "26rem",
    padding: "5rem 0",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    margin: "0 auto",
    background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.primary.contrastText} 44%, transparent 100%)`,
  },
}))

const Header = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.bg}>
      <Box className={classes.mask}>
        <Stack direction="column" spacing={isMobileOnly ? "3.2rem" : "1.4rem"} alignItems="center">
          <Typography sx={{ fontSize: "7.8rem", lineHeight: 1, fontWeight: 600 }}>Our story</Typography>
          <Typography sx={{ fontSize: "2.6rem", maxWidth: "68rem" }}>
            We are pragmatic problem solvers, passionate community builders and champions of open-source code.
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default Header
