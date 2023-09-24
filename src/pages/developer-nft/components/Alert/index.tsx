import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/refactor/nft-alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/refactor/nft-alert-success.svg"

const useStyles = makeStyles<any>()((theme, { type }) => ({
  root: {
    borderRadius: type === "multiline" ? 10 : 5,
    padding: type === "multiline" ? "1.2rem 1.6rem" : "0.9rem 1.6rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },
  standardError: {
    backgroundColor: "#FF684B",
    color: "#FFEBD7",
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
  message: {
    lineHeight: 1.5,
    fontWeight: 600,
  },
}))

const CheckAlert = props => {
  const { type, children, ...restProps } = props

  const { classes } = useStyles({ type })

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
        message: classes.message,
      }}
      {...restProps}
    >
      {children}
    </Alert>
  )
}

export default CheckAlert
