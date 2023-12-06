import { makeStyles } from "tss-react/mui"

import { Snackbar } from "@mui/material"

import Alert from "@/components/Alert/NFTAlert"

const useStyles = makeStyles()(theme => ({
  snackbar: {
    width: "max-content",
    maxWidth: "calc(100% - 1.6rem)",

    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
}))

const RequestWarning = props => {
  const { open, onClose, severity = "error", children, AlertComponent } = props
  const { classes } = useStyles()

  const CustomAlert = AlertComponent || Alert
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      classes={{ root: classes.snackbar }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={onClose}
    >
      <div>
        <CustomAlert severity={severity} sx={{ maxWidth: "49rem" }}>
          {children}
        </CustomAlert>
      </div>
    </Snackbar>
  )
}

export default RequestWarning
