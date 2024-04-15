import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import LoadingPage from "../loading"
import ReadyToMint from "./home"

const CanvasMint = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()
  const { profileMinted, profileMintedChecking, mintFlowVisible } = useCanvasStore()

  const renderMint = () => {
    if (!mintFlowVisible && walletCurrentAddress && (profileMintedChecking || profileMinted === null)) {
      return <LoadingPage></LoadingPage>
    } else if (!mintFlowVisible && profileMinted) {
      return <Navigate to="/scroll-canvas" state={{ initialMint: true }} replace></Navigate>
    }
    return <ReadyToMint code={code}></ReadyToMint>
  }

  return <>{renderMint()}</>
}

export default CanvasMint
