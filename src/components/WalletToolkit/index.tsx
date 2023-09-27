import { useLocation } from "react-router-dom"

import { Stack } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

import BridgeHistoryButton from "./BridgeHistoryButton"
import NetworkIndicator from "./NetworkSelect"
import WalletDropdown from "./WalletDropdown"

const WalletToolkit = props => {
  const { dark } = props
  const { pathname } = useLocation()
  const { isMobile } = useCheckViewport()

  return (
    <Stack direction="row" spacing="0.8rem">
      {!isMobile && <NetworkIndicator></NetworkIndicator>}
      {pathname === "/bridge" && <BridgeHistoryButton></BridgeHistoryButton>}
      <WalletDropdown dark={dark}></WalletDropdown>
    </Stack>
  )
}

export default WalletToolkit
