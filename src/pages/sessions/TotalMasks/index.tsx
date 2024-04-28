import { motion } from "framer-motion"
import { useState } from "react"

import { Box, Skeleton, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { generateWalletPointsUrl } from "@/apis/sessions"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"
import { commafy, isProduction } from "@/utils"

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
  const [isLoading, setIsLoading] = useState(true)

  const marks = useAsyncMemo(async () => {
    setIsLoading(true)
    try {
      const data = await scrollRequest(generateWalletPointsUrl(walletCurrentAddress))
      setIsLoading(false)
      return data[0].points
    } catch (error) {
      setIsLoading(false)
      return "--"
    }
  }, [walletCurrentAddress])

  return (
    <MotionBox
      sx={{
        width: ["calc(100vw - 4rem)", "38rem"],
        height: ["20.4rem", "25.2rem"],
        padding: "3.2rem",
        background: "#FFF0DD",
        borderRadius: "1.6rem",
        margin: ["0 auto"],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: ["relative", "absolute"],
        zIndex: 1,
        top: ["0", `calc(10.5vw + ${isProduction ? "10rem" : "16.5rem"})`],
        left: ["0", "50%"],
        marginLeft: ["auto", "-19rem"],
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
      {hasSignedTerms && (
        <>
          <Typography
            sx={{
              fontSize: ["4rem", "5.6rem"],
              lineHeight: ["2.4rem", "8rem"],
              fontWeight: 600,
              fontFamily: "var(--developer-page-font-family)",
            }}
          >
            {isLoading ? <StatisticSkeleton></StatisticSkeleton> : <>{commafy(marks)}</>}
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontStyle: "italic" }}>
            Marks are updated every 24 hours
          </Typography>
        </>
      )}

      {walletCurrentAddress && !hasSignedTerms && (
        <>
          <>
            <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.8rem"], textAlign: "center" }}>
              You need to agree to Sessions’s terms and conditions to see your marks and details
            </Typography>
            <Button color="primary" whiteButton onClick={() => changeSignatureRequestVisible(true)} width={isMobile ? "100%" : "32.2rem"}>
              View terms and conditions
            </Button>
          </>
        </>
      )}
    </MotionBox>
  )
}

export default TotalPoints
