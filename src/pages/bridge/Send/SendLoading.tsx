import { makeStyles } from "tss-react/mui"

import CloseIcon from "@mui/icons-material/Close"
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"

const useStyles = makeStyles()(theme => {
  return {
    section: {
      padding: "0.8rem 6.2rem 5rem",
      [theme.breakpoints.up("sm")]: {
        padding: "0.8rem 4.2rem 4rem",
      },
    },
  }
})

const SendLoading = props => {
  const { value, from, to, open, onClose } = props
  const { walletName } = useRainbowContext()
  const { classes } = useStyles()

  return (
    <Dialog open={open} disableScrollLock>
      <DialogTitle sx={{ p: "2.4rem 2.8rem" }}>
        <div className="flex justify-end">
          {onClose ? (
            <IconButton
              sx={[
                theme => ({
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                  },
                }),
              ]}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <CircularProgress
          size={50}
          thickness={3}
          sx={{
            color: "tagSuccess.main",
            mb: "2.4rem",
          }}
        ></CircularProgress>
        <Typography variant="h4" gutterBottom>
          Pending Confirmation
        </Typography>
        <div className={classes.section}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
            Sending {value} from {from} to {to}
          </Typography>
          <Typography variant="body1">Confirm this transaction on your {walletName} wallet</Typography>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SendLoading
