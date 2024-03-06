import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import Name from "./Name"
import ReferralCode from "./ReferralCode"

const SkellyMint = () => {
  const navigate = useNavigate()

  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedProfileRegistryContract } = useSkellyContext()
  const { checkIfProfileMinted, mintStep } = useSkellyStore()

  useEffect(() => {
    if (unsignedProfileRegistryContract && walletCurrentAddress) {
      checkIfProfileMinted(unsignedProfileRegistryContract, walletCurrentAddress).then(({ minted }) => {
        if (minted) {
          navigate("/scroll-skelly")
        }
      })
    }
  }, [unsignedProfileRegistryContract, walletCurrentAddress])

  return <>{mintStep === MintStep.NAME ? <Name></Name> : <ReferralCode></ReferralCode>}</>
}

export default SkellyMint
