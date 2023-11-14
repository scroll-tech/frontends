import { useState } from "react"

import { generateParamsByAddressURL } from "@/apis/nft"
import Button from "@/components/Button"
import Link from "@/components/Link"
import SectionWrapper from "@/components/SectionWrapper"
import { CHAIN_ID, L2_NAME } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

const Mock = () => {
  const { walletCurrentAddress, chainId, connect } = useRainbowContext()

  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGenerateProof = () => {
    setLoading(true)
    scrollRequest(generateParamsByAddressURL(walletCurrentAddress))
      .then(data => {
        setIsReady(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderAction = () => {
    if (chainId === CHAIN_ID.L2 && isReady) {
      return (
        <>
          {isReady ? (
            <Link underline="always" href="/developer-nft/mint">
              Go to Mint
            </Link>
          ) : (
            <Button color="primary" loading={loading} onClick={handleGenerateProof}>
              {loading ? "Genarating" : "Genarate Proof"}
            </Button>
          )}
        </>
      )
    } else if (chainId) {
      return (
        <Button color="primary" onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to {L2_NAME}
        </Button>
      )
    }
    return (
      <Button color="primary" onClick={connect}>
        Connect wallet
      </Button>
    )
  }

  return (
    <SectionWrapper dark sx={{ pb: "8rem", display: "flex", justifyContent: "center" }}>
      {renderAction()}
    </SectionWrapper>
  )
}

export default Mock
