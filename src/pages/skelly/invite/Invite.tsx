import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReferralCode from "../mint/ReferralCode"

const SkellyInvite = props => {
  const { code } = props
  const navigate = useNavigate()

  const { profileMintedLoading, profileMinted } = useSkellyStore()

  useEffect(() => {
    if (profileMinted) {
      navigate("/scroll-skelly")
    }
  }, [profileMinted])

  return (
    <>
      {profileMintedLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>{profileMinted === false ? <ReferralCode code={code}></ReferralCode> : <LoadingPage></LoadingPage>}</>
      )}
    </>
  )
}

export default SkellyInvite
