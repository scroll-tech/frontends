import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/refactor/nft-alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/refactor/nft-alert-success.svg"

const useStyles = makeStyles<any>()((theme, { type, weaker }) => ({
  root: {
    borderRadius: type === "multiline" ? 10 : 5,
    padding: type === "multiline" ? "1.2rem 1.6rem" : "1.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },
  standardError: {
    backgroundColor: "#FF684B",
    color: "#FFEBD7",
  },
  standardSuccess: {
    backgroundColor: "#62E3D1",
    color: theme.palette.text.primary,
  },
  standardInfo: {
    backgroundColor: theme.palette.themeBackground.highlight,
    color: theme.palette.text.primary,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    lineHeight: 1.5,
    fontWeight: weaker ? 500 : 600,
  },
}))

const CheckAlert = props => {
  const { type, weaker, children, ...restProps } = props

  const { classes } = useStyles({ type, weaker })

  return (
    <Alert
      iconMapping={{
        success: <SvgIcon sx={{ fontSize: "2.4rem", color: theme => theme.palette.text.primary }} component={SuccessSvg} inheritViewBox></SvgIcon>,
        error: <SvgIcon sx={{ fontSize: "2.4rem", color: "#FFEBD7" }} component={ErrorSvg} inheritViewBox></SvgIcon>,
        info: <SvgIcon sx={{ fontSize: "2.4rem", color: theme => theme.palette.text.primary }} component={ErrorSvg} inheritViewBox></SvgIcon>,
      }}
      classes={{
        root: classes.root,
        icon: classes.icon,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
        standardInfo: classes.standardInfo,
        message: classes.message,
      }}
      {...restProps}
    >
      {children}
    </Alert>
  )
}

export default CheckAlert
