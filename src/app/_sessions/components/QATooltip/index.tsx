"use client"

import { makeStyles } from "tss-react/mui"

import { Tooltip } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  popper: {
    zIndex: theme.zIndex.appBar - 1,
  },
  arrow: {
    color: theme.palette.text.primary,
    width: "2.9rem !important",
    height: "2rem !important",
    marginTop: "-2rem !important",
  },
  tooltip: {
    backgroundColor: theme.palette.text.primary,
    padding: "1.6rem 2.4rem",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    borderRadius: "2rem",
    width: "28rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "1.6rem !important",
    },
  },
}))

const QATooltip = props => {
  const { disabled, children, ...restProps } = props
  const { classes } = useStyles()

  return (
    <Tooltip
      arrow
      disableHoverListener={disabled}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      classes={{ tooltip: classes.tooltip, popper: classes.popper, arrow: classes.arrow }}
      {...restProps}
    >
      {children}
    </Tooltip>
  )
}

export default QATooltip
