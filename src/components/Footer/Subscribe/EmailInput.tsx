import { makeStyles } from "tss-react/mui"

import { Box, IconButton, InputBase, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowRightIcon } from "@/assets/svgs/common/arrow-right.svg"

const useStyles = makeStyles()(theme => ({
  wrapper: {
    position: "relative",
    display: "inline-block",
    height: "5.4rem",
    width: "44.8rem",
    [theme.breakpoints.up("md")]: {
      maxWidth: "41vw",
    },

    [theme.breakpoints.down("sm")]: {
      height: "4.8rem",
      width: "100%",
    },
  },
  inputRoot: {
    fontSize: "2rem",
    fontWeight: 600,
    height: "100%",
    width: "100%",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    borderRadius: "1rem",
    border: `1px solid ${theme.palette.text.primary}`,
    borderLeft: "none",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  input: {
    textAlign: "center",
    "&::placeholder": {
      color: "#DCDCDC",
      opacity: 1,
    },
  },

  mask: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    backgroundColor: theme.palette.themeBackground.dark,
    borderRadius: "1rem",
    zIndex: 1,
    top: 0,
    display: "flex",
    transition: "width 0.5s ease",
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
  expanding: {
    width: "100%",
  },
  icon: {
    width: "5.4rem",
    height: "100%",
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },

  successTip: {
    width: "calc(100% - 5.4rem)",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 4.8rem)",
    },
  },
}))

const EmailInput = props => {
  const { end, onClick, onEnter, sx, ...restProps } = props
  const { classes, cx } = useStyles()

  const handleEnter = e => {
    if (e.keyCode === 13) {
      onEnter()
    }
  }

  return (
    <Box className={classes.wrapper} sx={sx}>
      <div className={cx(classes.mask, end && classes.expanding)}>
        <IconButton classes={{ root: classes.icon }} onClick={onClick}>
          <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
        </IconButton>
        <Typography
          sx={{
            fontSize: ["1.6rem", "2rem"],
            lineHeight: ["4.8rem", "5.4rem"],
            fontWeight: 600,
            flex: 1,
            textAlign: "center",
            color: theme => theme.palette.primary.contrastText,
            overflow: "hidden",
          }}
          className={cx(end && classes.successTip)}
        >
          Thank you for subscribing!
        </Typography>
      </div>
      <InputBase
        classes={{ root: classes.inputRoot, input: classes.input }}
        placeholder="your email address here"
        {...restProps}
        onKeyDown={handleEnter}
      ></InputBase>
    </Box>
  )
}

export default EmailInput
