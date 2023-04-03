import { makeStyles } from "tss-react/mui"

import { Alert, Snackbar } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  root: {
    maxWidth: "calc(100% - 24px)",
  },
  message: {
    wordBreak: "break-all",
  },
}))

const CornerTip = props => {
  const { open, children, autoHideDuration = 6000, onClose, AlertProps, severity } = props

  const { classes } = useStyles()
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert classes={{ root: classes.root, message: classes.message }} severity={severity || "warning"} {...AlertProps}>
        {children}
      </Alert>
    </Snackbar>
  )
}

export default CornerTip
