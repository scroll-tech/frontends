import { makeStyles } from "tss-react/mui"

import { Alert } from "@mui/material"

const useStyles = makeStyles<any>()((theme, { severity }) => ({
  root: {
    color: severity === "error" ? theme.palette.primary.contrastText : theme.palette.success.main,
    backgroundColor: severity === "error" ? "#5B5B5B" : theme.palette.success.light,
  },
  message: {
    fontSize: "2.4rem",
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
  },
}))

const TxAlert = props => {
  const { severity, children, ...restProps } = props
  const { classes } = useStyles({ severity })

  return (
    <Alert icon={false} classes={{ root: classes.root, message: classes.message }} {...restProps}>
      {children}
    </Alert>
  )
}

export default TxAlert
