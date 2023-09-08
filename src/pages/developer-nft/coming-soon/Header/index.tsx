import { useEffect } from "react"
import Countdown, { zeroPad } from "react-countdown"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import NFTImage from "@/assets/images/nft-image.png"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

import NFTCard from "../../components/NFTCard"
import Point from "./Point"

const Separator = styled(Typography)(({ theme }) => ({
  fontSize: "6.4rem",
  fontWeight: 600,
}))

const Header = () => {
  const { phrase, changePhrase, checkPhrase } = useNFTStore()

  useEffect(() => {
    checkPhrase()
  }, [])

  const renderCountDown = ({ total, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (phrase === "warm-up") {
        changePhrase("in-progress")
      }
      if (phrase === "in-progress") {
        changePhrase("end")
      }
      return null
    }

    return (
      <Stack direction="row" alignItems="center" spacing="3.2rem">
        <Point title={days} subTitle="Days"></Point>
        <Separator>:</Separator>
        <Point title={zeroPad(hours)} subTitle="Hours"></Point>
        <Separator>:</Separator>
        <Point title={zeroPad(minutes)} subTitle="Minutes"></Point>
        <Separator>:</Separator>
        <Point title={zeroPad(seconds)} subTitle="Seconds"></Point>
      </Stack>
    )
  }

  return (
    <Stack direction="column" spacing="2.4rem" alignItems="center">
      <Box
        sx={{
          background: "url(/imgs/nft/loop.svg) center no-repeat",
          width: "42.1rem",
          height: "42.1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NFTCard image={NFTImage} name="Scroll Early Developer NFT"></NFTCard>
      </Box>
      <Typography sx={{ fontSize: "7.8rem", lineHeight: "8.5rem", fontWeight: 600 }}>Early Developer NFT program</Typography>
      <Typography sx={{ fontSize: "2.4rem", fontWeight: 600 }}>Program {phrase === "warm-up" ? "starts" : "ends"} in</Typography>
      {phrase === "warm-up" && <Countdown key="warm-up" date={DEVELOPER_NFT_PHRASES.Start} renderer={renderCountDown}></Countdown>}
      {phrase === "in-progress" && <Countdown key="in-progress" date={DEVELOPER_NFT_PHRASES.End} renderer={renderCountDown}></Countdown>}
    </Stack>
  )
}

export default Header
