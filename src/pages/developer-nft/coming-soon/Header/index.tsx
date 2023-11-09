import { useEffect } from "react"
import Countdown, { zeroPad } from "react-countdown"
import { useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { DEVELOPER_NFT_PHRASES, MintableDate, SCROLL_ORIGINS_NFT } from "@/constants"
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
  const navigate = useNavigate()

  const { phrase, changePhrase, checkPhrase } = useNFTStore()

  useEffect(() => {
    checkPhrase()
  }, [])

  useEffect(() => {
    if (phrase === "end") {
      navigate("/developer-nft/mint", { replace: true })
    }
  }, [phrase])

  const renderCountDown = ({ total, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (phrase === "in-progress") {
        changePhrase("waiting")
      } else if (phrase === "waiting") {
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
      <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["5.6rem", "8.5rem"], fontWeight: 600 }}>{SCROLL_ORIGINS_NFT}</Typography>
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600 }}>
        {phrase === "in-progress" ? "Program ends in" : "NFT releases in"}
      </Typography>
      {phrase === "in-progress" && <Countdown key="in-progress" date={DEVELOPER_NFT_PHRASES.Ends} renderer={renderCountDown}></Countdown>}
      {phrase === "waiting" && <Countdown key="waiting" date={MintableDate} renderer={renderCountDown}></Countdown>}
    </Stack>
  )
}

export default Header
