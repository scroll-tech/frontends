import { useEffect, useMemo } from "react"
import { Navigate, useMatch, useNavigate } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const SkellyIndex = props => {
  const { code } = props
  const navigate = useNavigate()
  const isOthersSkelly = useMatch("/scroll-skelly/:address")
  const isBadgeDetail = useMatch("/scroll-skelly/badge/:id")

  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { unsignedProfileRegistryContract } = useSkellyContext()
  const { profileMintedLoading, profileMinted, checkIfProfileMinted, changeMintStep } = useSkellyStore()
  console.log(profileMinted, "profileMinted skelly homepage")
  const isWrongNetwork = useMemo(() => {
    return !isOthersSkelly && !isBadgeDetail && chainId && chainId !== CHAIN_ID.L2
  }, [chainId, isOthersSkelly, isBadgeDetail])

  useEffect(() => {
    if (!isWrongNetwork && unsignedProfileRegistryContract && walletCurrentAddress) {
      checkIfProfileMinted(unsignedProfileRegistryContract, walletCurrentAddress)
    } else if (!isWrongNetwork && !walletCurrentAddress) {
      navigate("/scroll-skelly/mint")
      changeMintStep(MintStep.REFERRAL_CODE)
    }
  }, [isWrongNetwork, unsignedProfileRegistryContract, walletCurrentAddress])

  // cons

  // if connected user views the invite link, then redirect to skelly
  return (
    <>
      {isWrongNetwork ? (
        <WrongNetwork></WrongNetwork>
      ) : (
        <>
          {profileMintedLoading ? (
            <LoadingPage></LoadingPage>
          ) : (
            <>
              {profileMinted === true && <>{code ? <Navigate to="/scroll-skelly" replace={true}></Navigate> : <Dashboard />}</>}
              {profileMinted === false && <Navigate to="/scroll-skelly/mint" replace={true}></Navigate>}
            </>
          )}
        </>
      )}
    </>
  )
}

export default SkellyIndex
