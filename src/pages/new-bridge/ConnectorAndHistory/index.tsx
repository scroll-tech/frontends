import { isDesktop, isMobileOnly } from "react-device-detect"

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
    <Stack direction="row" spacing={isMobileOnly ? "2rem" : "1.5rem"} {...props}>
      <WalletConnector sx={{ flex: 1 }}></WalletConnector>
      {isDesktop && <NetworkIndicator></NetworkIndicator>}
      <Button variant="contained" color="inherit" sx={{ fontSize: ["1.6rem", "2rem"], p: 0, flex: 1 }} onClick={handleChangeMode}>
        Transaction History
      </Button>
    </Stack>
  )
}

export default ConnectorAndHistory
