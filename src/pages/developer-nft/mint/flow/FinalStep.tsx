import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSwiperSlide } from "swiper/react"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { SCROLL_ORIGINS_NFT } from "@/constants"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useNFTStore from "@/stores/nftStore"
import { decodeSVG } from "@/utils"

import NFTImage from "../../components/NFTCard/NFTImage"

const FinalStep = () => {
  const navigate = useNavigate()
  const swiperSlide = useSwiperSlide()
  const { walletCurrentAddress } = useRainbowContext()
  const { unsignedNFTInstance } = useNFTContext()
  const { changeIsEligible } = useNFTStore()

  const [tokenURI, setTokenURI] = useState()

  useEffect(() => {
    if (swiperSlide.isActive) {
      getTokenURIByAddress(unsignedNFTInstance, walletCurrentAddress)
    }
  }, [unsignedNFTInstance, walletCurrentAddress, swiperSlide.isActive])

  const getTokenURIByAddress = async (instance, address) => {
    const balance = await instance.balanceOf(address)
    console.log(balance, "balance")
    const tokenId = await instance.tokenOfOwnerByIndex(address, balance - BigInt(1))
    console.log(tokenId, "tokenId")
    const encodedtTokenURI = await instance.tokenURI(tokenId)

    const { tokenURI } = decodeSVG(encodedtTokenURI)
    setTokenURI(tokenURI)
  }

  const handleGoShow = () => {
    changeIsEligible(0)
    navigate("/developer-nft/my")
  }

  return (
    <Container sx={{ pt: ["2.4rem", "4rem"], pb: ["8rem", "14rem"] }}>
      <Stack alignItems="center" spacing="1.6rem">
        <NFTImage sx={{ width: ["108%", "52rem"] }} src={tokenURI}></NFTImage>
        <Typography
          sx={{ fontSize: ["2.4rem", "4.8rem"], fontWeight: 600, lineHeight: ["3.2rem", "7.2rem"], width: ["100%", "61.6rem"], textAlign: "center" }}
        >
          You have successfully minted {SCROLL_ORIGINS_NFT}!
        </Typography>
        <Button color="primary" onClick={handleGoShow}>
          Done
        </Button>
      </Stack>
    </Container>
  )
}

export default FinalStep
