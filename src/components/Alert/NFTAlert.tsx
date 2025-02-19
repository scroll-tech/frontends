// TODO: to be unified, prefer this
import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import ErrorSvg from "@/assets/svgs/nft/alert-error.svg"
import SuccessSvg from "@/assets/svgs/nft/alert-success.svg"

const useStyles = makeStyles<any>()((theme, { type }) => ({
  root: {
    borderRadius: type === "compact" ? 10 : 5,
    padding: type === "compact" ? "0.8rem 1.6rem" : "1.6rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },
  standardError: {
    backgroundColor: "#FF684B",
    color: "#FFEBD7",
  },
  standardSuccess: {
    backgroundColor: "#DFFCF8",
    color: "#0F8E7E",
  },
  standardInfo: {
    backgroundColor: theme.vars.palette.themeBackground.highlight,
    color: theme.vars.palette.text.primary,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    lineHeight: 1.5,
    fontWeight: type === "compact" ? 500 : 600,
  },
}))

const CheckAlert = props => {
  const { type, children, ...restProps } = props

  const { classes } = useStyles({ type })

  return (
    <Alert
      iconMapping={{
        success: <SuccessSvg className="w-[2.4rem]"></SuccessSvg>,
        error: <ErrorSvg className="w-[2.4rem]"></ErrorSvg>,
        info: <ErrorSvg className="w-[2.4rem]"></ErrorSvg>,
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
