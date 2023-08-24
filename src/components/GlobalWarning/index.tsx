import { Alert, Snackbar } from "@mui/material"

import { RPC_URL } from "@/constants"
import useBlockNumbers from "@/hooks/useBlockNumbers"

const GlobalWarning = () => {
  const { isL1Available, isL2Available } = useBlockNumbers()

  return (
    <>
      {!isL1Available && (
        <Snackbar open={true}>
          <Alert severity="error">{RPC_URL.L1} is not available, please wait...</Alert>
        </Snackbar>
      )}
      {!isL2Available && (
        <Snackbar open={true}>
          <Alert severity="error">{RPC_URL.L2} is not available, please wait...</Alert>
        </Snackbar>
      )}
    </>
  )
}

export default GlobalWarning
