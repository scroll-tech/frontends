import { Contract, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const SCROLL_ORIGINS_NFT_ADDRESS = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT")

type NFTContextProps = {
  NFTInstance: any
  unsignedNFTInstance: any
}

const NFTContext = createContext<NFTContextProps | null>(null)

const NFTContextProvider = ({ children }: any) => {
  const { provider, chainId } = useRainbowContext()

  const [NFTInstance, setNFTInstance] = useState<Contract>()
  const [unsignedNFTInstance, setUnsignedNFTInstance] = useState<Contract>()

  useEffect(() => {
    if (provider && chainId === CHAIN_ID.L2) {
      initializeInstance(provider)
    }
  }, [provider, chainId])

  const initializeInstance = async provider => {
    const signer = await provider.getSigner(0)
    const instance = new ethers.Contract(SCROLL_ORIGINS_NFT_ADDRESS, ScrollOriginsNFTABI, signer)
    const unsignedInstance = new ethers.Contract(SCROLL_ORIGINS_NFT_ADDRESS, ScrollOriginsNFTABI, provider)
    setNFTInstance(instance)
    setUnsignedNFTInstance(unsignedInstance)
  }

  return (
    <NFTContext.Provider
      value={{
        NFTInstance,
        unsignedNFTInstance,
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
