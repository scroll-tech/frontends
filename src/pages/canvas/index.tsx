import { useMemo } from "react"
import { Navigate, useMatch } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const CanvasIndex = props => {
  const isOthersCanvas = useMatch("/canvas/:address")
  const isBadgeDetail = useMatch("/canvas/badge/:id")

  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { profileMintedChecking, profileMinted } = useCanvasStore()
  const isWrongNetwork = useMemo(() => {
    return !isOthersCanvas && !isBadgeDetail && chainId !== CHAIN_ID.L2
  }, [chainId, isOthersCanvas, isBadgeDetail])

  const renderCanvas = () => {
    // return <LoadingPage></LoadingPage>
    if (!walletCurrentAddress) {
      return <Navigate to="/canvas/mint" replace={true}></Navigate>
    } else if (profileMintedChecking || profileMinted === null) {
      return <LoadingPage></LoadingPage>
    } else if (profileMinted) {
      // if connected user views the invite link, then redirect to canvas
      return <Dashboard />
    }
    return <Navigate to="/canvas/mint" replace={true}></Navigate>
  }

  return (
    <>
      {renderCanvas()}
      {isWrongNetwork && <WrongNetwork></WrongNetwork>}
    </>
  )
}

export default CanvasIndex
