import { useMemo } from "react"

import { SvgIcon } from "@mui/material"

import { ReactComponent as MainnetInactiveSvg } from "@/assets/svgs/refactor/bridge-network-mainnet-inactive.svg"
import { ReactComponent as MainnetSvg } from "@/assets/svgs/refactor/bridge-network-mainnet.svg"
import { ReactComponent as ScrollInactiveSvg } from "@/assets/svgs/refactor/bridge-network-scroll-inactive.svg"
import { ReactComponent as ScrollSvg } from "@/assets/svgs/refactor/bridge-network-scroll.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

const NetworkIndicator = () => {
  const { chainId } = useRainbowContext()

  const { fromNetwork } = useBridgeStore()

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

  return <SvgIcon sx={{ fontSize: "4.6rem", cursor: "auto" }} component={icon} inheritViewBox></SvgIcon>
}

export default NetworkIndicator
