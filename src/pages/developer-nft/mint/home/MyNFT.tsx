import { useEffect, useState } from "react"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ContractReleaseDate } from "@/constants"
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

const MyNFT = props => {
  const { total } = props

  const { walletCurrentAddress, provider } = useRainbowContext()
  const { unsignedNFTInstance } = useNFTContext()
  const { isLandscape } = useCheckViewport()
  const [loading, setLoading] = useState(false)
  const [tokenURI, setTokenURI] = useState()
  const [mintTimestamp, setMintTimestamp] = useState<number>()
  const [rarity, setRarity] = useState()

  useEffect(() => {
    getTokenURIByAddress(unsignedNFTInstance, walletCurrentAddress)
  }, [])

  const getTokenURIByAddress = async (instance, address) => {
    try {
      setLoading(true)
      const balance = await instance.balanceOf(address)
      const tokenId = await instance.tokenOfOwnerByIndex(address, balance - BigInt(1))
      const mintTxBlockNumber = await instance.mintData(tokenId)
      const blockDetail = await provider?.getBlock(mintTxBlockNumber)
      setMintTimestamp(blockDetail ? blockDetail.timestamp * 1e3 : undefined)
      const encodedtTokenURI = await instance.tokenURI(tokenId)
      const metadata = decodeSVG(encodedtTokenURI)
      const { tokenURI, rarity } = metadata
      setTokenURI(tokenURI)
      setRarity(rarity)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.6rem",
        "& .MuiTypography-root": {
          color: theme => theme.palette.primary.contrastText,
        },
        "@media (max-width: 1280px)": {
          gap: 0,
        },
        "@media (max-width: 1200px)": {
          display: "grid",
          gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
          justifyItems: "center",
        },
        "@media (max-width: 900px)": {
          gridTemplateColumns: "1fr",
          justifyItems: "center",
        },
      }}
    >
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
            {rarity ? `${rarity}%` : "-"}
          </Statistic>
          <Statistic label="You minted on" loading={loading}>
            {mintTimestamp ? formatDate(mintTimestamp) : "-"}
          </Statistic>
          <Statistic label="Total NFTs minted" loading={loading}>
            {total ? total.toString() : "-"}
          </Statistic>
          <Statistic label="Released on">{formatDate(ContractReleaseDate)}</Statistic>
        </Grid>
      </Stack>
    </Box>
  )
}

export default MyNFT
