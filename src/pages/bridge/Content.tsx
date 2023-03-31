import { Alert, Snackbar } from "@mui/material"

import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"
import useTxStore from "@/stores/txStore"

import RencentTx from "./RencentTx"
import Send from "./Send"

const Content = () => {
  const {
    txHistory: { errorMessage, changeErrorMessage },
  } = useApp()
  const { recentTxVisible } = useBridgeStore()
  const { warningTip, clearWarningTip } = useTxStore()

  const handleClose = () => {
    changeErrorMessage("")
  }

  const handleCloseWarning = () => {
    clearWarningTip()
  }
  return (
    <>
      {recentTxVisible ? <RencentTx></RencentTx> : <Send></Send>}

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      <Snackbar ClickAwayListenerProps={{ onClickAway: () => void 0 }} open={!!warningTip} autoHideDuration={null} onClose={handleCloseWarning}>
        <Alert severity="warning" onClose={handleCloseWarning}>
          {warningTip}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Content
