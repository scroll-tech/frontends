import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReadyToMint from "../mint/home"

const SkellyInvite = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()

  const { profileMintedChecking, profileMinted, mintFlowVisible } = useSkellyStore()

  if (!mintFlowVisible && walletCurrentAddress && (profileMintedChecking || profileMinted === null)) {
    return <LoadingPage></LoadingPage>
  }
  if (!mintFlowVisible && profileMinted) {
    return <Navigate to="/scroll-skelly"></Navigate>
  }

  return <ReadyToMint code={code}></ReadyToMint>
}

export default SkellyInvite
