import { Alert, Snackbar } from "@mui/material"

import { useApp } from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"

import RencentTx from "./RencentTx"
import Send from "./Send"

const Content = () => {
  const {
    txHistory: { errorMessage, changeErrorMessage },
  } = useApp()
  const { recentTxVisible } = useBridgeStore()

  const handleClose = () => {
    changeErrorMessage("")
  }
  return (
    <>
      {recentTxVisible ? <RencentTx></RencentTx> : <Send></Send>}

      <Snackbar open={!!errorMessage} autoHideDuration={null} sx={{ ".MuiAlert-action": { padding: "0 0.8rem" } }} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Content
