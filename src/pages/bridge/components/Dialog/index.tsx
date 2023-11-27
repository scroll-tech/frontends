import { makeStyles } from "tss-react/mui"

import { Dialog, DialogContent, IconButton, SvgIcon } from "@mui/material"

import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"

const useStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: "62.8rem",
    maxWidth: "unset",
    borderRadius: "2rem",
    backgroundColor: theme.palette.themeBackground.light,
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 0",
    },
  },
  dialogContentRoot: {
    padding: "6.4rem 3.2rem 4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "6.4rem 2rem 2rem",
    },
  },
}))

const BridgeDialog = props => {
  const { open, onClose, children } = props
  const { classes } = useStyles()

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 28,
        }}
      >
        <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>{children}</DialogContent>
    </Dialog>
  )
}

export default BridgeDialog
