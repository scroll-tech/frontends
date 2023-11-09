import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useNFTStore from "@/stores/nftStore"

import MintEntry from "./entry"
import MintFlow from "./flow"

const Mint = () => {
  const { chainId } = useRainbowContext()

  const { isEligible } = useNFTStore()
  const [minted] = useState(false)

  useEffect(() => {
    // TODO: determine whether user has minted a NFT
    // balanceOf(address owner)
    //
  }, [])

  if (chainId === CHAIN_ID.L2 && minted) {
    return <Navigate to="/developer-nft/my" replace={true}></Navigate>
  }

  if (isEligible === 1) return <MintFlow></MintFlow>

  return <MintEntry></MintEntry>
}

export default Mint
