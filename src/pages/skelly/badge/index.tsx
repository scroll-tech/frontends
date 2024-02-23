import { useState } from "react"

import LoadingPage from "@/components/LoadingPage"
import SectionWrapper from "@/components/SectionWrapper"

import Detail from "./Detail"

const MintHome = () => {
  // const { walletCurrentAddress, chainId } = useRainbowContext()
  // const {} = useSkellyContext()
  // const { isEligible, isMinting, changeNFTVersion, changeIsEligible } = useNFTStore()

  const [loading] = useState(false)
  const [isMinted] = useState(false)
  // const [mintedAmount, setMintedAmount] = useState<bigint>()

  // const checkIsMinted = async (instance, instance2, address) => {
  //   try {
  //     setLoading(true)
  //     // const balance = await fetchBalance(instance, address)
  //     // const balance2 = await fetchBalance(instance2, address)
  //     // setIsMinted(balance || balance2)
  //     // if (balance) {
  //     //   changeNFTVersion(1)
  //     // } else if (balance2) {
  //     //   changeNFTVersion(2)
  //     // }
  //     // const totalSupply = await fetchTotalSupply(instance)
  //     // const totalSupply2 = await fetchTotalSupply(instance2)
  //     // setMintedAmount(totalSupply + totalSupply2)
  //   } catch (e) {
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <SectionWrapper
      dark
      sx={{
        pt: ["2.4rem", isMinted ? "3.2rem" : "4rem", "8rem"],
        pb: ["8rem", "16rem"],
      }}
    >
      <>{loading ? <LoadingPage height="40rem"></LoadingPage> : <Detail />}</>
    </SectionWrapper>
  )
}

export default MintHome
