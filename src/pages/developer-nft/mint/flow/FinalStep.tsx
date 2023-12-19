import { useEffect, useMemo, useState } from "react"
import ReactGA from "react-ga4"
import { useSwiperSlide } from "swiper/react"

import { Container, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import Button from "@/components/Button"
import { SCROLL_ORIGINS_NFT } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useNFTStore from "@/stores/nftStore"
import { decodeSVG, requireEnv } from "@/utils"

import NFTImage from "../../components/NFTCard/NFTImage"

const FinalStep = () => {
  const swiperSlide = useSwiperSlide()

  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedNFTInstance, unsignedNFTV2Instance } = useNFTContext()
  const { changeIsEligible, nftVersion } = useNFTStore()
  const { isMobile } = useCheckViewport()

  const [tokenId, setTokenId] = useState()
  const [tokenURI, setTokenURI] = useState()

  const realNFTInstance = useMemo(
    () => (nftVersion === 1 ? unsignedNFTInstance : unsignedNFTV2Instance),
    [unsignedNFTInstance, unsignedNFTV2Instance, nftVersion],
  )

  useEffect(() => {
    if (swiperSlide.isActive) {
      getTokenURIByAddress(realNFTInstance, walletCurrentAddress)
    }
  }, [realNFTInstance, walletCurrentAddress, swiperSlide.isActive])

  const shareTwitterURL = useMemo(() => {
    const viewerUrl = `${requireEnv("REACT_APP_NFT_VIEWER_URL")}/developer-nft/${tokenId}`
    return `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      viewerUrl,
    )}&via=Scroll_ZKP`
  }, [tokenId])

  const getTokenURIByAddress = async (instance, address) => {
    const balance = await instance.balanceOf(address)
    const tokenId = await instance.tokenOfOwnerByIndex(address, balance - BigInt(1))
    setTokenId(tokenId)
    const encodedtTokenURI = await instance.tokenURI(tokenId)

    const { tokenURI } = decodeSVG(encodedtTokenURI)
    setTokenURI(tokenURI)
  }

  const handleGoShow = () => {
    // close Modal
    changeIsEligible(0)
  }

  const handleShare = () => {
    ReactGA.event("share_twitter", {
      tokenId,
    })
  }

  return (
    <Container sx={{ pt: ["2.4rem", "4rem"], pb: ["8rem", "14rem"] }}>
      <Stack alignItems="center" spacing="1.6rem">
        <NFTImage sx={{ width: ["108%", "52rem"] }} src={tokenURI}></NFTImage>
        <Typography
          sx={{ fontSize: ["2.4rem", "4.8rem"], fontWeight: 600, lineHeight: ["3.2rem", "7.2rem"], width: ["100%", "61.6rem"], textAlign: "center" }}
        >
          You have successfully minted a {SCROLL_ORIGINS_NFT}!
        </Typography>
        <Stack direction={isMobile ? "column-reverse" : "row"} gap="2rem">
          <Button color="primary" onClick={handleGoShow}>
            Done
          </Button>
          <Button color="secondary" href={shareTwitterURL} target="_blank" rel="noopener noreferrer" onClick={handleShare}>
            Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.6rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default FinalStep
