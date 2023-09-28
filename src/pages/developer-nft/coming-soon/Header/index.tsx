import { useEffect } from "react"
import Countdown, { zeroPad } from "react-countdown"

import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

import NFTCard from "../../components/NFTCard"
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

  useEffect(() => {
    checkPhrase()
  }, [])

  const renderCountDown = ({ total, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (phrase === "in-progress") {
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
      <NFTCard
        sx={{
          py: ["1.2rem", "2.6rem"],
          width: ["26rem", "31.2rem"],
        }}
      ></NFTCard>
      <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["5.6rem", "8.5rem"], fontWeight: 600 }}>Scroll Origins</Typography>
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600 }}>Program ends in</Typography>
      <Countdown date={DEVELOPER_NFT_PHRASES.Ends} renderer={renderCountDown}></Countdown>
    </Stack>
  )
}

export default Header
