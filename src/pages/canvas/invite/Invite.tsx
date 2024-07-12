import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import LoadingPage from "../loading"
import ReadyToMint from "../mint/home"

const CanvasInvite = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()

  const { profileMintedChecking, profileMinted, mintFlowVisible } = useCanvasStore()

  if (!mintFlowVisible && walletCurrentAddress && (profileMintedChecking || profileMinted === null)) {
    return <LoadingPage></LoadingPage>
  }
  if (!mintFlowVisible && profileMinted) {
    return <Navigate to="/canvas"></Navigate>
  }

  return <ReadyToMint code={code}></ReadyToMint>
}

export default CanvasInvite
