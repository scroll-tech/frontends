import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Stack } from "@mui/material"

import { ContractReleaseDate } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { formatDate } from "@/utils"

import Statistic from "../../components/Statistic"

const Description = () => {
  const navigate = useNavigate()
  const { isMobile } = useCheckViewport()

  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedNFTInstance } = useNFTContext()
  const [mintedAmount, setMintedAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (unsignedNFTInstance) {
      setLoading(true)
      checkMinted(unsignedNFTInstance)
        .then(value => {
          if (value) {
            navigate("/developer-nft/my", { replace: "true" })
          } else {
            fetchTotalSupply(unsignedNFTInstance)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [unsignedNFTInstance])

  const checkMinted = async instance => {
    // return await instance.balanceOf("0x1e65441d23dDbcdB0e6dcaC3D2A4F08487F63531")
    // TODO: should release
    return await instance.balanceOf(walletCurrentAddress)
  }

  const fetchTotalSupply = async instance => {
    const totalSupply = await instance.totalSupply()
    setMintedAmount(totalSupply)
  }

  return (
    <Stack direction="row" spacing={isMobile ? "2.4rem" : "4.8rem"}>
      <Statistic label="Total NFTs minted" loading={loading}>
        {mintedAmount ? mintedAmount.toString() : undefined}
      </Statistic>
      <Statistic label="NFTs released on">{formatDate(ContractReleaseDate)}</Statistic>
    </Stack>
  )
}

export default Description
