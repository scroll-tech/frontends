"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"

import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material"

import { fetchSession2TotalMarksURL } from "@/apis/sessions"
import QaSvg from "@/assets/svgs/sessions/qa.svg"
import Button from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"
import { commafy, formatLargeNumber } from "@/utils"

import MarksTooltip from "../components/MarksTooltip"
import QATooltip from "../components/QATooltip"

const SESSION_AIRDROP_LINK = "/blog/introducing-scroll-session-2"

const MotionBox = motion(Box)

const TotalPoints = () => {
  const { walletCurrentAddress, connect } = useRainbowContext()
  const { isMobile, isPortrait } = useCheckViewport()

  const { hasSignedTerms, changeSignatureRequestVisible } = useSessionsStore()

  const { data: session2Data, isFetching: session2Loading } = useQuery({
    queryKey: ["session2Marks", walletCurrentAddress],
    queryFn: async () => {
      const data = await scrollRequest(fetchSession2TotalMarksURL(walletCurrentAddress))
      if (data.status !== "1") {
        return Promise.reject(new Error("Something went wrong, please try again later."))
      }
      return data.result
    },
    enabled: !!walletCurrentAddress && hasSignedTerms,
    refetchOnWindowFocus: false,
    initialData: {},
  })

  return (
    <MotionBox
      sx={[
        {
          width: ["100%", "100%", "auto"],
          height: ["auto", "auto", "auto", "22rem"],
          backgroundColor: "background.default",
          borderRadius: "1.6rem",
          p: "2.4rem",
          display: "flex",
          justifyContent: "center",
        },
      ]}
      initial={isPortrait ? {} : { opacity: 1, y: 30, scale: 0.9 }}
      animate={isPortrait ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={isPortrait ? {} : { duration: 0.5 }}
    >
      {walletCurrentAddress && hasSignedTerms && (
        <Stack direction={["column", "row"]} sx={{ gap: "2.4rem", textAlign: "center", width: "100%", justifyContent: "space-evenly" }}>
          <Stack direction="column" alignItems="center" sx={{ gap: ["0.8rem", 0] }}>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Session 2 Marks</Typography>
            <MarksTooltip disabled={!session2Data.marks} title={session2Data.marks ? commafy(session2Data.marks) : "--"}>
              <Typography
                sx={{
                  fontSize: ["4rem", "5.6rem"],
                  lineHeight: ["4.8rem", "8rem"],
                  fontWeight: 600,
                  fontFamily: "var(--developer-page-font-family)",
                }}
              >
                {session2Loading ? (
                  <Skeleton sx={{ borderRadius: "1rem", width: "12rem", height: ["4.8rem", "8rem"], display: "inline-block" }}></Skeleton>
                ) : (
                  <>{session2Data.marks ? formatLargeNumber(session2Data.marks, 2) : "--"}</>
                )}
              </Typography>
            </MarksTooltip>
            <Typography sx={{ fontSize: "1.4rem", lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Marks are updated every 24 hrs
            </Typography>
            <Typography sx={{ fontSize: "1.4rem", lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Marks carried over from Session 0 & 1:{" "}
              {session2Loading ? (
                <Skeleton sx={{ borderRadius: "0.4rem", width: "3.2rem", height: "2rem", display: "inline-block" }}></Skeleton>
              ) : (
                <>{session2Data.carry ? formatLargeNumber(session2Data.carry, 2) : "--"}</>
              )}
            </Typography>
            <Link underline="always" href={SESSION_AIRDROP_LINK} className="font-developer !text-inherit !text-[1.4rem] !font-normal">
              Learn more
            </Link>
          </Stack>
          <Divider sx={{ borderColor: "#E9E9E9", borderLeftWidth: [0, "1px"] }} flexItem></Divider>
          <Stack direction="column" alignItems="center" sx={{ minWidth: ["auto", "auto", "20.5rem"] }}>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Total boost</Typography>
            <Typography
              sx={{
                fontSize: ["4rem", "5.6rem"],
                lineHeight: ["4.8rem", "8rem"],
                fontWeight: 600,
                fontFamily: "var(--developer-page-font-family)",
              }}
            >
              {session2Loading ? (
                <Skeleton sx={{ borderRadius: "1rem", width: "12rem", height: ["4.8rem", "8rem"], display: "inline-block" }}></Skeleton>
              ) : (
                <>{session2Data.boost ? formatLargeNumber(session2Data.boost, 2) + "x" : "--"}</>
              )}
            </Typography>
            <Stack direction="row" alignItems="center" spacing="4px">
              <Typography sx={{ fontSize: "1.4rem", lineHeight: "2.4rem", fontFamily: "var(--developer-page-font-family)" }}>
                How does this work
              </Typography>
              <QATooltip title="Providing liquidity in listed DEXs boosts your accrual rate. The more useful and volatile your liquidity pair, the higher the boost. Additional boosts will be introduced by Scroll’s upcoming LRTs soon.">
                <span className="text-[0] cursor-pointer">
                  <QaSvg></QaSvg>
                </span>
              </QATooltip>
            </Stack>
            <Typography></Typography>
          </Stack>
        </Stack>
      )}

      {!walletCurrentAddress && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Your Marks</Typography>
          <Typography
            sx={{ fontSize: ["4rem", "5.6rem"], lineHeight: ["2rem", "2.8rem"], fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}
          >
            --
          </Typography>
          <Button color="primary" whiteButton onClick={connect}>
            Connect Wallet
          </Button>
        </Stack>
      )}

      {walletCurrentAddress && !hasSignedTerms && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Your Marks</Typography>
          <Typography sx={{ fontSize: "1.4rem", lineHeight: "2.4rem", textAlign: "center" }}>
            You need to agree to Scroll Sessions Terms of Use to see your Marks and details
          </Typography>
          <Button color="primary" whiteButton onClick={() => changeSignatureRequestVisible(true)} width={isMobile ? "100%" : "32.2rem"}>
            View terms of use
          </Button>
        </Stack>
      )}
    </MotionBox>
  )
}

export default TotalPoints
