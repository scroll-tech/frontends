import { isDesktop, isMobileOnly } from "react-device-detect"

import { Button, Stack } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import NetworkIndicator from "./NetworkIndicator"
import WalletConnector from "./WalletConnector"

const ConnectorAndHistory = props => {
  const { changeMode, mode } = useBridgeStore()
  const handleChangeMode = () => {
    if (mode === "Transaction") {
      changeMode("History")
    } else {
      changeMode("Transaction")
    }
  }
  return (
    <Stack direction="row" spacing={isMobileOnly ? "2rem" : "1.5rem"} {...props}>
      <WalletConnector sx={{ flex: 1, p: 0 }}></WalletConnector>
      {isDesktop && <NetworkIndicator></NetworkIndicator>}
      <Button variant="contained" color="inherit" sx={{ fontSize: ["1.6rem", "2rem"], p: 0, flex: 1 }} onClick={handleChangeMode}>
        {mode === "Transaction" ? "Transaction History" : "Bridge"}
      </Button>
    </Stack>
  )
}

export default ConnectorAndHistory
