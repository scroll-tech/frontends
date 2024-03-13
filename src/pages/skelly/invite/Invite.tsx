import { Navigate } from "react-router-dom"

import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReferralCode from "../mint/ReferralCode"

const SkellyInvite = props => {
  const { code } = props

  const { profileMintedLoading, profileMinted } = useSkellyStore()

  if (profileMintedLoading || profileMinted === null) {
    return <LoadingPage></LoadingPage>
  }
  if (profileMinted) {
    return <Navigate to="/scroll-skelly"></Navigate>
  }

  return <ReferralCode code={code}></ReferralCode>
}

export default SkellyInvite
