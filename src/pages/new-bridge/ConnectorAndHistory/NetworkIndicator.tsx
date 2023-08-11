import { useMemo } from "react"

import { ButtonBase, SvgIcon } from "@mui/material"

import { ReactComponent as MainnetInactiveSvg } from "@/assets/svgs/refactor/bridge-network-mainnet-inactive.svg"
import { ReactComponent as MainnetSvg } from "@/assets/svgs/refactor/bridge-network-mainnet.svg"
import { ReactComponent as ScrollInactiveSvg } from "@/assets/svgs/refactor/bridge-network-scroll-inactive.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/refactor/bridge-network-scroll.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

const NetworkIndicator = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { isL1, changeMode } = useBridgeStore()

  const icon = useMemo(() => {
    if (!walletCurrentAddress && isL1()) {
      return MainnetInactiveSvg
    } else if (!walletCurrentAddress && !isL1()) {
      return ScrollInactiveSvg
    } else if (walletCurrentAddress && isL1()) {
      return MainnetSvg
    }
    return ScrollSvg
  }, [walletCurrentAddress, isL1])

  const handleChangeMode = () => {
    changeMode("Transaction")
  }

  return (
    <ButtonBase onClick={handleChangeMode}>
      <SvgIcon sx={{ fontSize: "4.6rem" }} component={icon} inheritViewBox></SvgIcon>
    </ButtonBase>
  )
}

export default NetworkIndicator
