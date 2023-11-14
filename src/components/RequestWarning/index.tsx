import { makeStyles } from "tss-react/mui"

import { Snackbar } from "@mui/material"

import Alert from "@/pages/developer-nft/components/Alert"

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
  const { open, onClose, children } = props
  const { classes } = useStyles()
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      classes={{ root: classes.snackbar }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={onClose}
    >
      <div>
        <Alert severity="error" sx={{ maxWidth: "49rem" }}>
          {children}
        </Alert>
      </div>
    </Snackbar>
  )
}

export default RequestWarning
