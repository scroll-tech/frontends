import { useEffect, useMemo, useState } from "react"
import ReactGA from "react-ga4"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import Button from "@/components/Button"
import RequestWarning from "@/components/RequestWarning"
import { ContractReleaseDate, NFT_RARITY_MAP, SCROLL_ORIGINS_NFT } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useNFTStore from "@/stores/nftStore"
import { decodeSVG, formatDate, requireEnv } from "@/utils"

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
  const { unsignedNFTInstance, unsignedNFTV2Instance } = useNFTContext()
  const { nftVersion } = useNFTStore()
  const { isLandscape, isMobile } = useCheckViewport()
  const [loading, setLoading] = useState(false)

  const [tokenId, setTokenId] = useState()
  const [tokenURI, setTokenURI] = useState()
  const [mintTimestamp, setMintTimestamp] = useState<number>()
  const [rarity, setRarity] = useState()
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    getTokenURIByAddress(nftVersion === 1 ? unsignedNFTInstance : unsignedNFTV2Instance, walletCurrentAddress)
  }, [nftVersion])

  const scrollscanURL = useMemo(
    () =>
      `${requireEnv("REACT_APP_ETHERSCAN_L2")}/token/${
        nftVersion === 1 ? requireEnv("REACT_APP_SCROLL_ORIGINS_NFT") : requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
      }?a=${tokenId}`,
    [tokenId],
  )

  const shareTwitterURL = useMemo(() => {
    const viewerUrl = `${requireEnv("REACT_APP_NFT_VIEWER_URL")}/developer-nft/${tokenId}`
    return `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      viewerUrl,
    )}&text=${encodeURIComponent("I have minted a Scroll Origins NFT!")}&via=Scroll_ZKP`
  }, [tokenId])

  const getTokenURIByAddress = async (instance, address) => {
    try {
      setLoading(true)
      const balance = await instance.balanceOf(address)
      const tokenId = await instance.tokenOfOwnerByIndex(address, balance - BigInt(1))
      setTokenId(tokenId)
      const mintTxBlockNumber = await instance.mintData(tokenId)
      const blockDetail = await provider?.getBlock(mintTxBlockNumber)
      setMintTimestamp(blockDetail ? blockDetail.timestamp * 1e3 : undefined)
      const encodedtTokenURI = await instance.tokenURI(tokenId)
      const metadata = decodeSVG(encodedtTokenURI)
      const { tokenURI, rarity } = metadata
      setTokenURI(tokenURI)
      setRarity(rarity)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setErrorMessage("")
  }

  const handleShare = () => {
    ReactGA.event("share_twitter", {
      tokenId,
    })
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
          You have minted a {SCROLL_ORIGINS_NFT}!
        </Typography>
        <Grid>
          <Statistic label="NFT rarity" loading={loading}>
            {rarity ? NFT_RARITY_MAP[rarity] : "-"}
          </Statistic>
          <Statistic label="You minted on" loading={loading}>
            {mintTimestamp ? formatDate(mintTimestamp) : "-"}
          </Statistic>
          <Statistic label="Total NFTs minted" loading={loading}>
            {total ? total.toString() : "-"}
          </Statistic>
          <Statistic label="Released on">{formatDate(ContractReleaseDate)}</Statistic>
        </Grid>
        <Stack direction={isMobile ? "column" : "row"} gap="1.6rem">
          <Button color="primary" href={scrollscanURL} target="_blank" rel="noopener noreferrer">
            View on Scrollscan
          </Button>
          <Button color="secondary" href={shareTwitterURL} target="_blank" rel="noopener noreferrer" onClick={handleShare}>
            Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.6rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
          </Button>
        </Stack>
      </Stack>
      <RequestWarning open={!!errorMessage} onClose={handleClose}>
        {errorMessage}
      </RequestWarning>
    </Box>
  )
}

export default MyNFT
