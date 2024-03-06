import { Contract, JsonRpcProvider, ethers } from "ethers"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

import ProfileRegistryABI from "@/assets/abis/SkellyProfileRegistry.json"
import { CHAIN_ID, RPC_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const PROFILE_REGISTRY_ADDRESS = requireEnv("REACT_APP_PROFILE_REGISTRY_ADDRESS")

type SkellyContextProps = {
  unsignedProfileRegistryContract: any
  profileRegistryContract: any
  publicProvider: any
}

const SkellyContext = createContext<SkellyContextProps | null>(null)

// only include contract instance && public provider
const SkellyContextProvider = ({ children }: any) => {
  const { provider, chainId } = useRainbowContext()

  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])

  const [publicProvider, setPublicProvider] = useState<JsonRpcProvider | null>(null)

  const [profileRegistryContract, setProfileRegistryContract] = useState<Contract>()
  const [unsignedProfileRegistryContract, setUnsignedProfileRegistryContract] = useState<Contract>()

  const initializeInstanceWrapped = async provider => {
    const signer = await provider.getSigner(0)
    const profileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, signer)
    const unsignedProfileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, provider)
    setProfileRegistryContract(profileRegistryContract)
    setUnsignedProfileRegistryContract(unsignedProfileRegistryContract)
  }

  const initializeRPCInstance = async provider => {
    const instance = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, provider)
    setUnsignedProfileRegistryContract(instance)
  }

  useEffect(() => {
    if (provider && isL2) {
      initializeInstanceWrapped(provider)
    } else {
      const instance = new JsonRpcProvider(RPC_URL.L2)
      setPublicProvider(instance)
      initializeRPCInstance(instance)
    }
  }, [provider, isL2])

  return (
    <SkellyContext.Provider
      value={{
        unsignedProfileRegistryContract,
        profileRegistryContract,
        publicProvider: isL2 ? provider : publicProvider,
      }}
    >
      {children}
    </SkellyContext.Provider>
  )
}

export function useSkellyContext() {
  const ctx = useContext(SkellyContext)
  if (!ctx) {
    throw new Error("useSkellyContext must be used within SkellyContextProvider")
  }
  return ctx
}

export default SkellyContextProvider
