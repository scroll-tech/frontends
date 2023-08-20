import { Alert, Snackbar } from "@mui/material"

import useCheckNetworkAvailable from "@/hooks/useCheckNetworkAvailable"

const GlobalWarning = () => {
  const { isL2Available } = useCheckNetworkAvailable()

  return (
    <>
      {!isL2Available && (
        <Snackbar open={true}>
          <Alert severity="error">L2 rpc network is not available, please wait</Alert>
        </Snackbar>
      )}
    </>
  )
}

export default GlobalWarning
