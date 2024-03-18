import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReadyToMint from "./home"

const SkellyMint = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()
  const { profileMinted, profileMintedChecking, mintFlowVisible } = useSkellyStore()

  const renderMint = () => {
    if (!mintFlowVisible && walletCurrentAddress && (profileMintedChecking || profileMinted === null)) {
      return <LoadingPage></LoadingPage>
    } else if (!mintFlowVisible && profileMinted) {
      return <Navigate to="/scroll-skelly" replace></Navigate>
    }
    return <ReadyToMint code={code}></ReadyToMint>
  }

  return <>{renderMint()}</>
}

export default SkellyMint
