import { Contract, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import ScrollOriginsNFTV2ABI from "@/assets/abis/ScrollOriginsNFTV2.json"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT_ADDRESS = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")
const SCROLL_ORIGINS_NFT_V2_ADDRESS = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")

type NFTContextProps = {
  NFTInstance: any
  NFTV2Instance: any
  unsignedNFTInstance: any
  unsignedNFTV2Instance: any
}

const NFTContext = createContext<NFTContextProps | null>(null)

const NFTContextProvider = ({ children }: any) => {
  const { provider, chainId } = useRainbowContext()

  const [NFTInstance, setNFTInstance] = useState<Contract>()
  const [NFTV2Instance, setNFTV2Instance] = useState<Contract>()
  const [unsignedNFTInstance, setUnsignedNFTInstance] = useState<Contract>()
  const [unsignedNFTV2Instance, setUnsignedNFTV2Instance] = useState<Contract>()

  useEffect(() => {
    if (provider && chainId === CHAIN_ID.L2) {
      initializeInstance(provider)
    }
  }, [provider, chainId])

  const initializeInstance = async provider => {
    const signer = await provider.getSigner(0)
    const instance = new ethers.Contract(SCROLL_ORIGINS_NFT_ADDRESS, ScrollOriginsNFTABI, signer)
    const instanceV2 = new ethers.Contract(SCROLL_ORIGINS_NFT_V2_ADDRESS, ScrollOriginsNFTV2ABI, signer)
    const unsignedInstance = new ethers.Contract(SCROLL_ORIGINS_NFT_ADDRESS, ScrollOriginsNFTABI, provider)
    const unsignedV2Instance = new ethers.Contract(SCROLL_ORIGINS_NFT_V2_ADDRESS, ScrollOriginsNFTV2ABI, provider)
    setNFTInstance(instance)
    setNFTV2Instance(instanceV2)
    setUnsignedNFTInstance(unsignedInstance)
    setUnsignedNFTV2Instance(unsignedV2Instance)
  }

  return (
    <NFTContext.Provider
      value={{
        NFTInstance,
        NFTV2Instance,
        unsignedNFTInstance,
        unsignedNFTV2Instance,
      }}
    >
      {children}
    </NFTContext.Provider>
  )
}

export function useNFTContext() {
  const ctx = useContext(NFTContext)
  if (!ctx) {
    throw new Error("useNFTContext must be used within NFTContextProvider")
  }
  return ctx
}

export default NFTContextProvider
