import { makeStyles } from "tss-react/mui"

import { Box, Container, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CalenderSvg } from "@/assets/svgs/sticker-contest/calender.svg"
import Button from "@/components/Button"
import { STICKER_CONTEST_DISCORD_VOTE_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import GridBackground from "../components/GridBackground"

const useStyles = makeStyles()(theme => ({
  announcement: {
    position: "absolute",
    top: "-2rem",
    left: "50%",
    transform: "translateX(-50%)",
    border: `3px solid ${theme.palette.text.primary}`,
    borderRadius: "1rem",
    backgroundColor: "#FFE1DC",
    padding: "0.7rem 2rem",
    [theme.breakpoints.down("md")]: {
      top: "-4rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.6rem 2rem",
      borderWidth: "2px",
      top: "-3rem",
    },
  },

  vote: {
    position: "absolute",
    bottom: "3.3rem",
    left: "50%",
    transform: "translateX(-50%)",
    [theme.breakpoints.down("sm")]: {
      bottom: "2rem",
    },
  },
  award: {
    padding: "0.8rem 2rem",
    border: `3px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.themeBackground.light,
    borderRadius: "1.6rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      borderWidth: "2px",
    },
  },
}))

const StickerContest = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <Box sx={{ backgroundColor: "themeBackground.brand", pt: ["3rem", "4rem", "2rem"] }}>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <GridBackground></GridBackground>
        <Announcement></Announcement>
        <Box className={classes.vote}>
          <Button color="primary" width={isMobile ? "22.4rem" : "28.5rem"} href={STICKER_CONTEST_DISCORD_VOTE_URL} target="_blank" whiteButton>
            Vote on Discord Now
          </Button>
        </Box>
      </Container>
      <Award></Award>
    </Box>
  )
}

const Announcement = () => {
  const { classes } = useStyles()
  const { isPortrait } = useCheckViewport()

  return (
    <Stack direction="row" alignItems="center" gap={1} className={classes.announcement}>
      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={CalenderSvg} inheritViewBox></SvgIcon>
      <Typography
        sx={{
          fontSize: ["1.6rem", "3.2rem"],
          lineHeight: ["2.4rem", "4rem"],
          fontWeight: 500,
          fontFamily: "var(--developer-page-font-family)",
          whiteSpace: "nowrap",
        }}
      >
        Voting ends:{isPortrait && <br></br>} Sun, Feb 11, 2024 23:59 UTC
      </Typography>
    </Stack>
  )
}

const Award = () => {
  const { classes } = useStyles()
  const { isPortrait } = useCheckViewport()

  return (
    <Container sx={{ mt: "2rem", pb: ["3.6rem", "4.2rem"] }}>
      <Stack direction="row" justifyContent="center" alignItems="center" className={classes.award}>
        <Typography
          sx={{ fontSize: ["1.8rem", "3.2rem"], lineHeight: ["2.4rem", "4rem"], fontWeight: 500, fontFamily: "var(--developer-page-font-family)" }}
        >
          Top 1 prize: <strong>1000 USD</strong> {isPortrait ? <br></br> : "|"} Top 2-5 prize: <strong>200 USD</strong> each
        </Typography>
      </Stack>
    </Container>
  )
}

export default StickerContest
