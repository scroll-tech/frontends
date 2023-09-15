import { useEffect, useMemo } from "react"
import Countdown, { zeroPad } from "react-countdown"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

// import NFT from "@/assets/images/nft-image.png"
import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

import NFTImage from "../../components/NFTCard/NFTImage"
import Statistic from "../../components/Statistic/StatisticReverse"

const Separator = styled(Typography)(({ theme }) => ({
  fontSize: "6.4rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.2rem",
  },
}))

const Header = () => {
  const { phrase, changePhrase, checkPhrase } = useNFTStore()

  const nftCountdown = useMemo(() => {
    if (phrase === "warm-up") {
      return ["starts", DEVELOPER_NFT_PHRASES.Starts]
    }
    return ["ends", DEVELOPER_NFT_PHRASES.Ends]
  }, [phrase])

  useEffect(() => {
    checkPhrase()
  }, [])

  const renderCountDown = ({ total, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (phrase === "warm-up") {
        changePhrase("in-progress")
      } else if (phrase === "in-progress") {
        changePhrase("end")
      }
      return null
    }

    return (
      <Stack direction="row" alignItems="center" sx={{ gap: ["0.8rem", "3.2rem"] }}>
        <Statistic title={days} subTitle="Days"></Statistic>
        <Separator>:</Separator>
        <Statistic title={zeroPad(hours)} subTitle="Hours"></Statistic>
        <Separator>:</Separator>
        <Statistic title={zeroPad(minutes)} subTitle="Minutes"></Statistic>
        <Separator>:</Separator>
        <Statistic title={zeroPad(seconds)} subTitle="Seconds"></Statistic>
      </Stack>
    )
  }

  return (
    <Stack sx={{ width: "100%", gap: ["1.6rem", "2.4rem"] }} direction="column" alignItems="center">
      <Box
        sx={{
          background: "url(/imgs/nft/loop.svg) center no-repeat",
          backgroundSize: "cover",
          width: ["100%", "42.1rem"],
          aspectRatio: "1/1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NFTImage sx={{ width: "65%", aspectRatio: ["211/247", "277/ 324"] }} src="/imgs/nft/nft-image.png"></NFTImage>
      </Box>
      <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["5.6rem", "8.5rem"], fontWeight: 600 }}>Scroll Origin NFT</Typography>
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600 }}>Program {nftCountdown[0]} in</Typography>
      <Countdown key={phrase} date={nftCountdown[1]} renderer={renderCountDown}></Countdown>
    </Stack>
  )
}

export default Header
