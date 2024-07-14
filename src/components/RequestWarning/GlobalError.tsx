import { forwardRef } from "react"
import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/nft/alert-error.svg"

const useStyles = makeStyles()(theme => ({
  alert: {
    borderRadius: 5,
    padding: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },
  defaultError: {
    backgroundColor: "#FF684B",
    color: "#FFEBD7",
  },
  icon: {
    marginRight: 8,
  },
  message: {
    lineHeight: 1.5,
    fontWeight: 600,
  },
}))

const GlobalWarning = forwardRef((props: any, ref) => {
  const { severity = "error", message, children, style, ...restProps } = props
  const { classes } = useStyles()

  return (
    <Alert
      ref={ref}
      style={style}
      severity={severity}
      sx={{ maxWidth: "49rem" }}
      iconMapping={{
        error: <SvgIcon sx={{ fontSize: "2.4rem", color: "#FFEBD7" }} component={ErrorSvg} inheritViewBox></SvgIcon>,
      }}
      classes={{
        root: classes.alert,
        icon: classes.icon,
        defaultError: classes.defaultError,
        message: classes.message,
      }}
      {...restProps}
    >
      {message}
    </Alert>
  )
})

export default GlobalWarning
