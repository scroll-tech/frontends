import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ContractReleaseDate, DEVELOPER_NFT_PHRASES } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import { decodeSVG, formatDate } from "@/utils"

import NFTImage from "../../components/NFTCard/NFTImage"
import Statistic from "../../components/Statistic"

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  rowGap: "2.4rem",
  columnGap: "4.8rem",
  [theme.breakpoints.down("sm")]: {
    columnGap: "2.4rem",
  },
}))

const NFTDetail = () => {
  const navigate = useNavigate()

  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedNFTInstance } = useNFTContext()
  const { isLandscape } = useCheckViewport()
  const [loading, setLoading] = useState(false)
  const [mintedAmount, setMintedAmount] = useState<bigint>()
  const [tokenURI, setTokenURI] = useState()
  const [rarity, setRarity] = useState()

  useEffect(() => {
    if (unsignedNFTInstance && walletCurrentAddress) {
      getTokenURIByAddress(unsignedNFTInstance, walletCurrentAddress)
      getTotalSupply(unsignedNFTInstance)
    }
  }, [unsignedNFTInstance, walletCurrentAddress])

  const getTokenURIByAddress = async (instance, address) => {
    setLoading(true)
    const balance = await instance.balanceOf(address)
    if (!balance) {
      navigate("/developer-nft/mint", { replace: true })
      return
    }
    const tokenId = await instance.tokenOfOwnerByIndex(address, balance - BigInt(1))
    const encodedtTokenURI = await instance.tokenURI(tokenId)

    const { tokenURI, rarity } = decodeSVG(encodedtTokenURI)
    setTokenURI(tokenURI)
    setRarity(rarity)
    setLoading(false)
  }

  const getTotalSupply = async instance => {
    const totalSupply = await instance.totalSupply()
    setMintedAmount(totalSupply)
  }

  return (
    <>
      <NFTImage sx={{ width: ["100%", "44rem", "44rem", "52rem"] }} src={tokenURI}></NFTImage>
      <Stack direction="column" sx={{ gap: ["1.6rem", "2.4rem", "4.8rem"] }} alignItems={isLandscape ? "flex-start" : "center"}>
        <Typography
          sx={{
            fontSize: ["4rem", "7.2rem"],
            fontWeight: 600,
            maxWidth: ["auto", "63rem"],
            lineHeight: ["5.6rem", "9.6rem"],
            textAlign: ["center", "center", "left", "left"],
          }}
        >
          You have successfully minted a Scroll Origins Detail!
        </Typography>
        <Grid>
          <Statistic label="NFT rarity" loading={loading}>
            {rarity}%
          </Statistic>
          <Statistic label="You minted on" loading={loading}>
            {formatDate(DEVELOPER_NFT_PHRASES.Starts)}
          </Statistic>
          <Statistic label="Total NFTs minted" loading={loading}>
            {mintedAmount ? mintedAmount.toString() : undefined}
          </Statistic>
          <Statistic label="Released on">{formatDate(ContractReleaseDate)}</Statistic>
        </Grid>
      </Stack>
    </>
  )
}

export default NFTDetail
