import { Navigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import LoadingPage from "../loading"
import Name from "./Name"
import ReferralCode from "./ReferralCode"

const SkellyMint = props => {
  const { code } = props

  const { walletCurrentAddress } = useRainbowContext()
  const { mintStep, profileMinted, profileMintedLoading } = useSkellyStore()

  const renderMint = () => {
    if ((profileMintedLoading || profileMinted === null) && walletCurrentAddress) {
      return <LoadingPage></LoadingPage>
    } else if (profileMinted) {
      return <Navigate to="/scroll-skelly" replace></Navigate>
    } else if (mintStep === MintStep.NAME) {
      return <Name></Name>
    }
    return <ReferralCode code={code}></ReferralCode>
  }

  return <>{renderMint()}</>
}

export default SkellyMint
