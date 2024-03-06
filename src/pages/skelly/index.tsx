import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const SkellyIndex = props => {
  const { code } = props
  const navigate = useNavigate()
  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedProfileRegistryContract } = useSkellyContext()
  const { profileMintedLoading, profileMinted, checkIfProfileMinted } = useSkellyStore()

  useEffect(() => {
    if (unsignedProfileRegistryContract && walletCurrentAddress) {
      checkIfProfileMinted(unsignedProfileRegistryContract, walletCurrentAddress)
    } else if (!walletCurrentAddress) {
      navigate("/scroll-skelly/mint")
    }
  }, [unsignedProfileRegistryContract, walletCurrentAddress])

  // if connected user views the invite link, then redirect to skelly
  return (
    <>
      {profileMintedLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>
          {profileMinted === null && <WrongNetwork></WrongNetwork>}
          {profileMinted === true && <>{code ? <Navigate to="/scroll-skelly" replace={true}></Navigate> : <Dashboard />}</>}
          {profileMinted === false && <Navigate to="/scroll-skelly/mint" replace={true}></Navigate>}
        </>
      )}
    </>
  )
}

export default SkellyIndex
