import { motion } from "framer-motion"
import { isNumber } from "lodash"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { Box, Skeleton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchWalletPointsUrl } from "@/apis/sessions"
import Button from "@/components/Button"
import { WALLET_MARKS } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"
import { formatLargeNumber } from "@/utils"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "12rem",
  height: "8rem",
  display: "inline-block",
}))

const MotionBox = motion(Box)

const TotalPoints = () => {
  const { walletCurrentAddress, connect } = useRainbowContext()
  const { isMobile } = useCheckViewport()

  const { hasSignedTerms, changeSignatureRequestVisible } = useSessionsStore()

  const [walletMarks, setWalletMarks] = useStorage(localStorage, WALLET_MARKS, {})

  const { data: marks, isLoading } = useSWR(
    [fetchWalletPointsUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
    async ([url, walletAddress, signed]) => {
      try {
        if (!walletAddress || !signed) {
          throw new Error("Wallet address or signed terms missing.")
        }
        const now = new Date().getTime()
        const updatedAt = walletMarks[walletAddress]?.updatedAt ?? 0
        const lastUpdatedTime = new Date(updatedAt).getTime()
        // const isDataExpired = now - lastUpdatedTime > 24 * 60 * 60 * 1000
        const isDataExpired = now - lastUpdatedTime > 10 * 1000

        if (isDataExpired) {
          const data = await scrollRequest(url)
          const points = data[0].points
          setWalletMarks({
            ...walletMarks,
            [walletAddress]: {
              points,
              updatedAt: now,
            },
          })
          return points
        } else {
          return walletMarks[walletAddress].points
        }
      } catch (e) {
        return null
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return (
    <MotionBox
      sx={{
        width: ["calc(100vw - 4rem)", "calc(100vw - 4rem)", "38rem"],
        height: ["20.4rem", "25.2rem", "25.2rem"],
        padding: "3.2rem",
        background: "#FFF0DD",
        borderRadius: "1.6rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: ["relative", "relative", "absolute"],
        zIndex: 1,
        top: [0, 0, `calc(-46vw + 10rem)`],
        left: [0, 0, "50%"],
        marginLeft: ["auto", "auto", "-19rem"],
      }}
      initial={isMobile ? {} : { opacity: 0, y: 30, scale: 0.9 }}
      animate={isMobile ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={isMobile ? {} : { duration: 0.5, delay: 1.3 }}
    >
      <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600 }}>Your Marks</Typography>
      {!walletCurrentAddress && (
        <>
          <Typography sx={{ fontSize: ["4rem", "5.6rem"], lineHeight: ["4.8rem"], fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}>
            --
          </Typography>
          <Button color="primary" whiteButton onClick={connect}>
            Connect Wallet
          </Button>
        </>
      )}
      {walletCurrentAddress && hasSignedTerms && (
        <>
          <Typography
            sx={{
              fontSize: ["4rem", "5.6rem"],
              lineHeight: ["2.4rem", "8rem"],
              fontWeight: 600,
              fontFamily: "var(--developer-page-font-family)",
            }}
          >
            {isLoading ? <StatisticSkeleton></StatisticSkeleton> : <>{isNumber(marks) ? formatLargeNumber(marks, 2) : "--"}</>}
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontStyle: "italic", textAlign: "center" }}>
            Marks are updated every 24 hours
            <br />
            <a style={{ textDecoration: "underline" }} href="https://scroll.io/blog/introducing-scroll-sessions">
              More about Sessions
            </a>
          </Typography>
        </>
      )}

      {walletCurrentAddress && !hasSignedTerms && (
        <>
          <>
            <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.8rem"], textAlign: "center" }}>
              You need to agree to Scroll Sessions Terms of Use to see your Marks and details
            </Typography>
            <Button color="primary" whiteButton onClick={() => changeSignatureRequestVisible(true)} width={isMobile ? "100%" : "32.2rem"}>
              View terms of use
            </Button>
          </>
        </>
      )}
    </MotionBox>
  )
}

export default TotalPoints
