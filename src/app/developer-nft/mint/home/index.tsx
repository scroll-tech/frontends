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
  const { unsignedNFTInstance, unsignedNFTV2Instance } = useNFTContext()
  const { isEligible, isMinting, changeNFTVersion, changeIsEligible } = useNFTStore()

  const [loading, setLoading] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const [mintedAmount, setMintedAmount] = useState<bigint>()

  useEffect(() => {
    if (walletCurrentAddress) {
      changeIsEligible(0)
    }
  }, [walletCurrentAddress])

  useEffect(() => {
    if (unsignedNFTInstance && unsignedNFTV2Instance && walletCurrentAddress && chainId === CHAIN_ID.L2 && !isEligible && !isMinting) {
      checkIsMinted(unsignedNFTInstance, unsignedNFTV2Instance, walletCurrentAddress)
    }
  }, [unsignedNFTInstance, unsignedNFTV2Instance, walletCurrentAddress, chainId, isEligible, isMinting])

  const checkIsMinted = async (instance, instance2, address) => {
    try {
      setLoading(true)
      const balance = await fetchBalance(instance, address)
      const balance2 = await fetchBalance(instance2, address)
      setIsMinted(balance || balance2)
      if (balance) {
        changeNFTVersion(1)
      } else if (balance2) {
        changeNFTVersion(2)
      }
      const totalSupply = await fetchTotalSupply(instance)
      const totalSupply2 = await fetchTotalSupply(instance2)
      setMintedAmount(totalSupply + totalSupply2)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const fetchTotalSupply = async instance => {
    return await instance.totalSupply()
  }

  const fetchBalance = async (instance, address) => {
    return await instance.balanceOf(address)
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
