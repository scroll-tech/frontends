import { makeStyles } from "tss-react/mui"

import { Tooltip } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  popper: {
    zIndex: theme.zIndex.appBar - 1,
  },
  tooltip: {
    background: "linear-gradient(180deg, #262626 0%, #111 100%)",
    padding: "1.2rem 1.4rem",
    fontSize: "1.8rem",
    lineHeight: "2.4rem",
    fontFamily: "var(--developer-page-font-family)",

    [theme.breakpoints.down("md")]: {
      marginTop: "0.8rem !important",
    },
  },
}))

const MarksTooltip = props => {
  const { disabled, children, ...restProps } = props
  const { classes } = useStyles()
  const { isLandscape } = useCheckViewport()

  return (
    <Tooltip
      disableHoverListener={disabled}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      followCursor={isLandscape}
      classes={{ tooltip: classes.tooltip, popper: classes.popper }}
      {...restProps}
    >
      {children}
    </Tooltip>
  )
}

export default MarksTooltip
