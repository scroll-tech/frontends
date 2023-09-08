import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/refactor/nft-alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/refactor/nft-alert-success.svg"

const useStyles = makeStyles()(theme => ({
  root: {
    borderRadius: 5,
    padding: "1.5rem",
  },
  standardError: {
    backgroundColor: "#FF684B",
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
  },
  standardSuccess: {
    backgroundColor: "#62E3D1",
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  icon: {
    marginRight: 8,
  },
}))

const CheckAlert = props => {
  const { children, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Alert
      iconMapping={{
        success: <SvgIcon sx={{ fontSize: "2.4rem" }} component={SuccessSvg} inheritViewBox></SvgIcon>,
        error: <SvgIcon sx={{ fontSize: "2.4rem" }} component={ErrorSvg} inheritViewBox></SvgIcon>,
      }}
      classes={{
        root: classes.root,
        icon: classes.icon,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
      }}
      {...restProps}
    >
      {children}
    </Alert>
  )
}

export default CheckAlert
