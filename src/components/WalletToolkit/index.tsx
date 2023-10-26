import { useLocation } from "react-router-dom"

import { Stack } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"

import BridgeHistoryButton from "./BridgeHistoryButton"
import NetworkIndicator from "./NetworkSelect"
import WalletDropdown from "./WalletDropdown"

const WalletToolkit = props => {
  const { dark } = props
  const { pathname } = useLocation()
  const { isMobile } = useCheckViewport()
  const { chainId } = useRainbowContext()

  return (
    <Stack direction="row" spacing="0.8rem">
      {chainId && !isMobile && <NetworkIndicator dark={dark}></NetworkIndicator>}
      {chainId && pathname === "/bridge" && <BridgeHistoryButton></BridgeHistoryButton>}
      <WalletDropdown dark={dark}></WalletDropdown>
    </Stack>
  )
}

export default WalletToolkit
