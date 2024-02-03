import { makeStyles } from "tss-react/mui"

import { Box, SvgIcon } from "@mui/material"

import { ReactComponent as CharacterSvg } from "@/assets/svgs/sticker-contest/character.svg"
import { ReactComponent as ContestSvg } from "@/assets/svgs/sticker-contest/contest.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/sticker-contest/scroll.svg"
import { ReactComponent as StickerSvg } from "@/assets/svgs/sticker-contest/sticker.svg"

const useStyles = makeStyles()(theme => ({
  bg: {
    height: "63.4rem",
    border: `3px solid ${theme.palette.text.primary}`,
    borderRadius: "1.6rem",
    backgroundSize: "4rem 4rem",
    backgroundOrigin: "border-box",
    backgroundColor: theme.palette.themeBackground.light,
    backgroundImage:
      "linear-gradient(to right, rgba(16, 16, 16, 0.05) 1px, transparent 1px),linear-gradient(to bottom, rgba(16, 16, 16, 0.05) 1px, transparent 1px)",
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
  stickerWrapper: {
    display: "grid",
    justifyContent: "center",
    marginTop: "6rem",
    gridColumnGap: "3rem",

    gridTemplateColumns: "repeat(2, max-content)",
    gridTemplateRows: "13rem repeat(2, max-content)",

    "@media (max-width: 1324px)": {
      gridTemplateRows: "15rem repeat(2, max-content)",
    },
    [theme.breakpoints.down("lg")]: {
      gridTemplateRows: "13rem repeat(2, max-content)",
      marginTop: "8rem",
      gridColumnGap: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateRows: "9.8rem repeat(2, max-content)",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "5rem",
      gridTemplateRows: "7rem repeat(2, max-content)",
      gridColumnGap: 0,
      gridRowGap: "1rem",
      paddingLeft: "1rem",
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
}))

const GridBackground = props => {
  const { className, ...restProps } = props
  const { classes, cx } = useStyles()
  return (
    <Box className={cx(classes.bg, className)} {...restProps}>
      <Box className={classes.stickerWrapper}>
        <SvgIcon
          className={classes.sticker}
          sx={{ width: ["15.6rem", "25.6rem", "34rem", "auto"], height: "auto" }}
          component={ScrollSvg}
          inheritViewBox
        ></SvgIcon>
        <SvgIcon
          className={classes.sticker}
          sx={{ width: ["18.6rem", "32rem", "44rem", "auto"], height: "auto" }}
          component={StickerSvg}
          inheritViewBox
        ></SvgIcon>
        <SvgIcon
          className={classes.sticker}
          sx={{ width: ["15.9rem", "26rem", "35.5rem", "auto"], height: "auto" }}
          component={ContestSvg}
          inheritViewBox
        ></SvgIcon>
        <SvgIcon
          className={cx(classes.sticker, classes.character)}
          sx={{ width: ["14.6rem", "24rem", "34rem", "38.8rem"], height: "auto" }}
          component={CharacterSvg}
          inheritViewBox
        ></SvgIcon>
      </Box>
    </Box>
  )
}

export default GridBackground
