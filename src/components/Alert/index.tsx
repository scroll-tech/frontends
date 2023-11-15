import { makeStyles } from "tss-react/mui"

import { Alert as MuiAlert, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/bridge/alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/bridge/alert-success.svg"

const useStyles = makeStyles()(theme => ({
  root: {
    borderRadius: "1rem",
    padding: "1.2rem 1.6rem",
  },
  standardError: {
    backgroundColor: "#FFE1DB",
    color: "#FF684B",
    fontWeight: 600,
  },
  standardSuccess: {
    backgroundColor: "#DFFCF8",
    color: "#0F8E7E",
    fontWeight: 600,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    fontFamily: "var(--default-font-family) !important",
    lineHeight: 1.5,
    fontWeight: 600,
  },
}))

const Alert = props => {
  const { children, ...restProps } = props

  const { classes } = useStyles()

  return (
    <MuiAlert
      iconMapping={{
        success: <SvgIcon sx={{ fontSize: "3.2rem" }} component={SuccessSvg} inheritViewBox></SvgIcon>,
        error: <SvgIcon sx={{ fontSize: "3.2rem" }} component={ErrorSvg} inheritViewBox></SvgIcon>,
      }}
      classes={{
        root: classes.root,
        icon: classes.icon,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
        message: classes.message,
      }}
      {...restProps}
    >
      {children}
    </MuiAlert>
  )
}

export default Alert
