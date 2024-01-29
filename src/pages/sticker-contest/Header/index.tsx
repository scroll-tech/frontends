import { makeStyles } from "tss-react/mui"

import { Box, Container, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CalenderSvg } from "@/assets/svgs/sticker-contest/calender.svg"
import { ReactComponent as CharacterSvg } from "@/assets/svgs/sticker-contest/character.svg"
import { ReactComponent as ContestSvg } from "@/assets/svgs/sticker-contest/contest.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/sticker-contest/scroll.svg"
import { ReactComponent as StickerSvg } from "@/assets/svgs/sticker-contest/sticker.svg"
import Button from "@/components/Button"
import { STICKER_CONTEST_DISCORD_VOTE_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  bg: {
    height: "63.4rem",
    border: `3px solid ${theme.palette.text.primary}`,
    borderRadius: "1.6rem",
    backgroundSize: "4rem 4rem",
    backgroundOrigin: "border-box",
    backgroundColor: theme.palette.themeBackground.light,
    backgroundImage:
      "linear-gradient(to right, rgba(16, 16, 16, 0.20) 1px, transparent 1px),linear-gradient(to bottom, rgba(16, 16, 16, 0.20) 1px, transparent 1px)",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "3.2rem 3.2rem",
      height: "50rem",
    },

    [theme.breakpoints.down("sm")]: {
      backgroundSize: "2rem 2rem",
      width: "100%",
      height: "32rem",
      borderWidth: "2px",
    },
  },
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
  stickerWrapper: {
    display: "grid",
    justifyContent: "center",
    marginTop: "6rem",
    gridColumnGap: "3rem",

    gridTemplateColumns: "repeat(2, min-content)",
    gridTemplateRows: "13rem repeat(2, min-content)",

    "@media (max-width: 1324px)": {
      gridTemplateRows: "15rem repeat(2, min-content)",
    },
    [theme.breakpoints.down("lg")]: {
      gridTemplateRows: "13rem repeat(2, min-content)",
      marginTop: "8rem",
      gridColumnGap: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateRows: "9.8rem repeat(2, min-content)",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "6rem",
      gridTemplateRows: "7rem repeat(2, min-content)",
      gridColumnGap: 0,
    },
  },
  sticker: {
    "&:nth-of-type(2)": {
      gridRow: "2 / 3",
      paddingLeft: "34rem",
      alignSelf: "center",
    },
    "&:nth-of-type(3)": {
      paddingLeft: "20rem",
    },
    "@media (max-width: 1324px)": {
      transform: "scale(0.8)",
      transformOrigin: "right",
      "&:nth-of-type(2)": {
        paddingLeft: "24rem",
      },
      "&:nth-of-type(3)": {
        paddingLeft: "16rem",
      },
    },
    [theme.breakpoints.down("lg")]: {
      transform: "scale(1)",
      "&:nth-of-type(2)": {
        paddingLeft: "16rem",
      },
      "&:nth-of-type(3)": {
        paddingLeft: "8rem",
      },
    },
    [theme.breakpoints.down("md")]: {
      transform: "scale(1)",
      "&:nth-of-type(2)": {
        paddingLeft: "10rem",
      },
      "&:nth-of-type(3)": {
        paddingLeft: "4rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "&:nth-of-type(2)": {
        paddingLeft: "4rem",
      },
      "&:nth-of-type(3)": {
        paddingLeft: "1.5rem",
      },
    },
  },
  character: {
    gridColumn: "2 / 3",
    gridRow: "1 / 4",
    "@media (max-width: 1324px)": {
      transformOrigin: "left",
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
    height: "8rem",
    backgroundColor: theme.palette.themeBackground.light,
    borderRadius: "1.6rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      borderWidth: "2px",
    },
  },
}))

const StickerContest = () => {
  const { classes, cx } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <Box sx={{ backgroundColor: "themeBackground.brand", pt: ["3rem", "4rem", "2rem"] }}>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <Box className={classes.bg}>
          <Box className={classes.stickerWrapper}>
            <SvgIcon
              className={classes.sticker}
              sx={{ width: ["15.6rem", "25.6rem", "34rem", "auto"], height: "auto" }}
              component={ScrollSvg}
              inheritViewBox
            ></SvgIcon>
            <SvgIcon
              className={classes.sticker}
              sx={{ width: ["17.2rem", "32rem", "44rem", "auto"], height: "auto" }}
              component={StickerSvg}
              inheritViewBox
            ></SvgIcon>
            <SvgIcon
              className={classes.sticker}
              sx={{ width: ["14.4rem", "26rem", "35.5rem", "auto"], height: "auto" }}
              component={ContestSvg}
              inheritViewBox
            ></SvgIcon>
            <SvgIcon
              className={cx(classes.sticker, classes.character)}
              sx={{ width: ["14.2rem", "24rem", "34rem", "38.8rem"], height: "auto" }}
              component={CharacterSvg}
              inheritViewBox
            ></SvgIcon>
          </Box>
        </Box>
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
