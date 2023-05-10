import { Alert, Snackbar } from "@mui/material"

import { useApp } from "@/contexts/AppContextProvider"

import Send from "./Send"

const Content = () => {
  const {
    txHistory: { errorMessage, changeErrorMessage },
  } = useApp()

  const handleClose = () => {
    changeErrorMessage("")
  }

  return (
    <>
      <Send></Send>
      <Snackbar open={!!errorMessage} autoHideDuration={null} sx={{ ".MuiAlert-action": { padding: "0 0.8rem" } }} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Content
