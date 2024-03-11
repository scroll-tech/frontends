import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import LoadingPage from "../loading"
import ReferralCode from "../mint/ReferralCode"
import WrongNetwork from "../wrongNetwork"

const SkellyInvite = props => {
  const { code } = props
  const navigate = useNavigate()
  const { chainId } = useRainbowContext()

  const { profileMintedLoading, profileMinted } = useSkellyStore()

  const isWrongNetwork = useMemo(() => {
    return chainId !== CHAIN_ID.L2
  }, [chainId])

  useEffect(() => {
    if (profileMinted) {
      navigate("/scroll-skelly")
    }
  }, [profileMinted])

  return (
    <>
      {isWrongNetwork ? (
        <WrongNetwork></WrongNetwork>
      ) : (
        <>{profileMintedLoading ? <LoadingPage></LoadingPage> : <>{!profileMinted ? <ReferralCode code={code}></ReferralCode> : null}</>}</>
      )}
    </>
  )
}

export default SkellyInvite
