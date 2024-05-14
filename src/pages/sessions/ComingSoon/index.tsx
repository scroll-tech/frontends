"use client"

import Countdown, { zeroPad } from "react-countdown"

import { Stack, Typography } from "@mui/material"

import { Chapter1StartDate } from "@/constants/sessions"

import Card from "../components/Card"
import Statistic from "../components/Statistic"

const ComingSoon = () => {
  const renderCountDown = ({ days, hours, minutes, seconds }) => {
    return (
      <Stack direction="row" alignItems="center" sx={{ gap: ["0.8rem", "1.6rem"] }}>
        <Statistic large count={days} label="Day"></Statistic>
        <Typography sx={{ fontSize: "4rem", lineHeight: "5.6rem", fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}>:</Typography>
        <Statistic large count={zeroPad(hours)} label="Hour"></Statistic>
        <Typography sx={{ fontSize: "4rem", lineHeight: "5.6rem", fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}>:</Typography>
        <Statistic large count={zeroPad(minutes)} label="Min"></Statistic>
        <Typography sx={{ fontSize: "4rem", lineHeight: "5.6rem", fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}>:</Typography>
        <Statistic large count={zeroPad(seconds)} label="Sec"></Statistic>
      </Stack>
    )
  }
  return (
    <Card>
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem"], fontWeight: 600, textAlign: "center" }}>Session One</Typography>
      <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], lineHeight: ["1.6rem", "2.4rem"], textAlign: "center", mt: "0.8rem" }}>
        Stay tuned by following{" "}
        <a
          href="https://twitter.com/Scroll_ZKP"
          target="_blank"
          style={{ fontWeight: 700, color: "#FF684B", textDecoration: "underline" }}
          rel="noreferrer"
        >
          Scroll’s X
        </a>
      </Typography>
      <Stack direction="row" display="none" justifyContent="center" sx={{ mt: "1.6rem" }}>
        <Countdown date={Chapter1StartDate.valueOf()} renderer={renderCountDown}></Countdown>
      </Stack>
    </Card>
  )
}

export default ComingSoon
