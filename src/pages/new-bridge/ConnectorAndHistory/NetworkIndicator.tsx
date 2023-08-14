import { useMemo } from "react"

import { ButtonBase, SvgIcon } from "@mui/material"

import { ReactComponent as MainnetInactiveSvg } from "@/assets/svgs/refactor/bridge-network-mainnet-inactive.svg"
import { ReactComponent as MainnetSvg } from "@/assets/svgs/refactor/bridge-network-mainnet.svg"
import { ReactComponent as ScrollInactiveSvg } from "@/assets/svgs/refactor/bridge-network-scroll-inactive.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/refactor/bridge-network-scroll.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

const NetworkIndicator = () => {
  const { chainId } = useRainbowContext()

  const { fromNetwork, changeMode } = useBridgeStore()

  const icon = useMemo(() => {
    if (chainId && chainId === fromNetwork.chainId && fromNetwork.isL1) {
      return MainnetSvg
    } else if (chainId && chainId === fromNetwork.chainId && !fromNetwork.isL1) {
      return ScrollSvg
    } else if (fromNetwork.isL1) {
      return MainnetInactiveSvg
    }
    return ScrollInactiveSvg
  }, [chainId, fromNetwork])

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
