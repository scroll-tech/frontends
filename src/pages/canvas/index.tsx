import { useEffect, useMemo } from "react"
import { Navigate, useMatch, useNavigate } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const CanvasIndex = props => {
  const navigate = useNavigate()
  const isOthersCanvas = useMatch("/scroll-canvas/:address")
  const isBadgeDetail = useMatch("/scroll-canvas/badge/:id")

  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { profileMintedChecking, profileMinted } = useCanvasStore()
  const isWrongNetwork = useMemo(() => {
    return !isOthersCanvas && !isBadgeDetail && chainId !== CHAIN_ID.L2
  }, [chainId, isOthersCanvas, isBadgeDetail])

  useEffect(() => {
    if (!walletCurrentAddress) {
      navigate("/scroll-canvas/mint")
    }
  }, [walletCurrentAddress])

  const renderCanvas = () => {
    if (!walletCurrentAddress) {
      return <Navigate to="/scroll-canvas/mint" replace={true}></Navigate>
    } else if (isWrongNetwork) {
      return <WrongNetwork></WrongNetwork>
    } else if (profileMintedChecking || profileMinted === null) {
      return <LoadingPage></LoadingPage>
    } else if (profileMinted) {
      // if connected user views the invite link, then redirect to canvas
      return <Dashboard />
    }
    return <Navigate to="/scroll-canvas/mint" replace={true}></Navigate>
  }

  return <>{renderCanvas()}</>
}

export default CanvasIndex
