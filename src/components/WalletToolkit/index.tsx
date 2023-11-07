import { Stack } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"

import NetworkIndicator from "./NetworkSelect"
import WalletDropdown from "./WalletDropdown"

const WalletToolkit = props => {
  const { dark } = props
  const { isMobile } = useCheckViewport()
  const { chainId } = useRainbowContext()

  return (
    <Stack direction="row" spacing="0.8rem">
      {chainId && !isMobile && <NetworkIndicator dark={dark}></NetworkIndicator>}
      <WalletDropdown dark={dark}></WalletDropdown>
    </Stack>
  )
}

export default WalletToolkit
