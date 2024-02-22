import { makeStyles } from "tss-react/mui"

import { Box, Container, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as TadaSvg } from "@/assets/svgs/sticker-contest-result/tada.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
import GridBackground from "@/pages/sticker-vote/components/GridBackground"

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
    [theme.breakpoints.down("sm")]: {
      padding: "0.6rem 2rem",
      borderWidth: "2px",
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
    padding: "1.5rem 2rem",
    border: `3px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.themeBackground.light,
    borderRadius: "1.6rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: "0.6rem 2rem",
    },
    [theme.breakpoints.down("sm")]: {
      borderWidth: "2px",
    },
  },
}))

const StickerContestResult = () => {
  return (
    <Box sx={{ backgroundColor: "themeBackground.brand", pt: ["3rem", "2rem"] }}>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <GridBackground sx={{ pt: ["1rem", "2.6rem"] }}></GridBackground>
        <Announcement></Announcement>
      </Container>
      <Award></Award>
    </Box>
  )
}

const Announcement = () => {
  const { classes } = useStyles()

  return (
    <Stack direction="row" alignItems="center" gap={1} className={classes.announcement}>
      <SvgIcon sx={{ fontSize: ["2.4rem", "4rem"] }} component={TadaSvg} inheritViewBox></SvgIcon>
      <Typography
        sx={{
          fontSize: ["1.6rem", "3.2rem"],
          lineHeight: ["2.4rem", "4rem"],
          fontWeight: 500,
          fontFamily: "var(--developer-page-font-family)",
          whiteSpace: "nowrap",
        }}
      >
        The winners are here!!!
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
          sx={{ fontSize: ["1.8rem", "3.2rem"], lineHeight: ["2.4rem", "4.4rem"], fontWeight: 500, fontFamily: "var(--developer-page-font-family)" }}
        >
          Top 1 prize: <strong>1000 USD</strong> {isPortrait ? <br></br> : "|"} Top 2-5 prize: <strong>200 USD</strong> each
        </Typography>
      </Stack>
    </Container>
  )
}

export default StickerContestResult
