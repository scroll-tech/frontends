import { makeStyles } from "tss-react/mui"

import { Dialog, DialogTitle, IconButton, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CloseSvg } from "@/assets/svgs/refactor/bridge-close.svg"
import useBridgeStore from "@/stores/bridgeStore"

import TxHistoryTable from "./TxHistoryTable"

const useStyles = makeStyles()(theme => ({
  root: {
    ".MuiBackdrop-root": {
      // backgroundColor: theme.palette.primary.contrastText,
    },
  },
  paper: {
    // backgroundColor: theme.palette.themeBackground.optionHightlight,
    boxShadow: "unset",
    width: "100%",
    maxWidth: "75rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
    },
  },
}))

const TxHistoryDialog = (props: any) => {
  const { classes } = useStyles()
  const { historyVisible, changeHistoryVisible } = useBridgeStore()
  const handleClose = () => {
    changeHistoryVisible(false)
  }
  return (
    <Dialog maxWidth={false} open={historyVisible} classes={{ root: classes.root, paper: classes.paper }} onClose={handleClose}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], fontWeight: 600, lineHeight: 1 }}>Transaction History</Typography>
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"] }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>

      <TxHistoryTable></TxHistoryTable>
    </Dialog>
  )
}

export default TxHistoryDialog
