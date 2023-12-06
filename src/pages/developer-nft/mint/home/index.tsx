import { useEffect, useState } from "react"

import LoadingPage from "@/components/LoadingPage"
import SectionWrapper from "@/components/SectionWrapper"
import { CHAIN_ID } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useNFTStore from "@/stores/nftStore"

import MyNFT from "./MyNFT"
import ReadyToMint from "./ReadyToMint"

const MintHome = () => {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { unsignedNFTInstance } = useNFTContext()
  const { isEligible, isMinting } = useNFTStore()

  const [loading, setLoading] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const [mintedAmount, setMintedAmount] = useState<bigint>()

  useEffect(() => {
    if (unsignedNFTInstance && walletCurrentAddress && chainId === CHAIN_ID.L2 && !isEligible && !isMinting) {
      checkIsMinted(unsignedNFTInstance, walletCurrentAddress)
    }
  }, [unsignedNFTInstance, walletCurrentAddress, chainId, isEligible, isMinting])

  const checkIsMinted = async (instance, address) => {
    try {
      setLoading(true)
      const balance = await fetchBalance(instance, address)
      setIsMinted(!!balance)
      const totalSupply = await fetchTotalSupply(instance)
      setMintedAmount(totalSupply)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const fetchTotalSupply = async instance => {
    return await instance.totalSupply()
  }

  const fetchBalance = async (instance, address) => {
    // return await instance.balanceOf("0x22932C4c628675D995BD451c85B1D2510d35dbC5")
    // TODO: should release
    return await instance.balanceOf(walletCurrentAddress)
  }

  return (
    <SectionWrapper
      dark
      sx={{
        pt: ["2.4rem", isMinted ? "3.2rem" : "4rem", "8rem"],
        pb: ["8rem", "16rem"],
      }}
    >
      <>
        {loading ? (
          <LoadingPage height="30rem"></LoadingPage>
        ) : (
          <>{isMinted ? <MyNFT total={mintedAmount}></MyNFT> : <ReadyToMint total={mintedAmount}></ReadyToMint>}</>
        )}
      </>
    </SectionWrapper>
  )
}

export default MintHome
