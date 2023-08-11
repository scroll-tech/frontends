import { Button, Stack } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import NetworkIndicator from "./NetworkIndicator"
import WalletConnector from "./WalletConnector"

const ConnectorAndHistory = props => {
  const { changeMode } = useBridgeStore()
  const handleChangeMode = () => {
    changeMode("History")
  }
  return (
    <Stack direction="row" spacing="1.5rem" {...props}>
      <WalletConnector></WalletConnector>
      <NetworkIndicator></NetworkIndicator>
      <Button variant="contained" color="inherit" onClick={handleChangeMode}>
        Transaction History
      </Button>
    </Stack>
  )
}

export default ConnectorAndHistory
