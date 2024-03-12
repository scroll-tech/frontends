import { Navigate } from "react-router-dom"

import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReferralCode from "../mint/ReferralCode"

const SkellyInvite = props => {
  const { code } = props

  const { profileMintedLoading, profileMinted } = useSkellyStore()

  return (
    <>
      <>
        {profileMintedLoading ? (
          <LoadingPage></LoadingPage>
        ) : (
          <>{profileMinted ? <Navigate to="/scroll-skelly"></Navigate> : <ReferralCode code={code}></ReferralCode>}</>
        )}
      </>
    </>
  )
}

export default SkellyInvite
