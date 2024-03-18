import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReferralCode from "../mint/home"

const SkellyInvite = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()

  const { profileMintedChecking, profileMinted } = useSkellyStore()

  if ((profileMintedChecking || profileMinted === null) && walletCurrentAddress) {
    return <LoadingPage></LoadingPage>
  }
  if (profileMinted) {
    return <Navigate to="/scroll-skelly"></Navigate>
  }

  return <ReferralCode code={code}></ReferralCode>
}

export default SkellyInvite
