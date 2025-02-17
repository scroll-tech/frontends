import { motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { formatUnits } from "viem"
import { useGasPrice } from "wagmi"

import { Box, Button, Collapse, Stack, Typography } from "@mui/material"

import GasPriveDotSvg from "@/assets/svgs/header/gas-price-dot.svg"
import RequestWarning from "@/components/RequestWarning"
import { CHAIN_ID } from "@/constants"
import { NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { commafy, switchNetwork } from "@/utils"

const MotionBox = motion(Box)

const MobileGasPriceViewer = props => {
  const { dark } = props
  const { chainId } = useRainbowContext()

  const gasPriceRef = useRef<HTMLDivElement>(null)

  const [gasPricePanelVisible, setGasPricePanelVisible] = useState(false)

  const [warningVisible, setwarningVisible] = useState(false)

  const [gasPriceWidth, setGasPriceWidth] = useState(0)

  const { data: ethereumGasPrice } = useGasPrice({ chainId: CHAIN_ID.L1, query: { refetchInterval: 1000 * 60 * 1 } })

  const { data: scrollGasPrice } = useGasPrice({
    chainId: CHAIN_ID.L2,
    query: { refetchInterval: 1000 * 60 * 1 },
  })

  const displayedScrollGasPrice = useMemo(() => {
    if (scrollGasPrice) {
      return commafy(formatUnits(scrollGasPrice, 6).toString(), 2)
    }
    return "-"
  }, [scrollGasPrice])

  const displayedEthereumGasPrice = useMemo(() => {
    if (ethereumGasPrice) {
      return commafy(formatUnits(ethereumGasPrice, 6).toString(), 2)
    }
    return "-"
  }, [ethereumGasPrice])

  useEffect(() => {
    const width = gasPriceRef.current?.offsetWidth
    setGasPriceWidth(width ?? 0)
  }, [])

  const handleToggleGasPricePanel = () => {
    setGasPricePanelVisible(!gasPricePanelVisible)
  }

  const handleAddScrollToWallet = async () => {
    if (chainId === CHAIN_ID.L2) {
      setwarningVisible(true)
    } else {
      await switchNetwork(CHAIN_ID.L2)
    }
  }

  const handleCloseWarning = () => {
    setwarningVisible(false)
  }

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "0.5rem",
        width: "100%",
        height: "21.6rem",
        mt: "2.4rem",
        mb: "4.8rem",
        overflow: "hidden",
      }}
      ref={gasPriceRef}
    >
      <MotionBox
        initial="closed"
        animate={gasPricePanelVisible ? "open" : "closed"}
        sx={{
          width: "100%",
        }}
      >
        <MotionBox
          sx={{ position: "absolute", zIndex: 0, top: 0, width: "100%", left: 0, bottom: 0, backgroundColor: "background.default" }}
          variants={{
            open: {
              clipPath: `polygon(0 0, ${gasPriceWidth}px 0, ${gasPriceWidth}px 216px, 0 216px)`,
              transition: {
                ease: [0.165, 0.84, 0.44, 1],
              },
            },
            closed: {
              clipPath: `polygon(0 0, 100px 0, 100px 56px, 0 56px)`,
              transition: {
                ease: [0.165, 0.84, 0.44, 1],
                delay: 0.2,
              },
            },
          }}
        ></MotionBox>
        <Stack
          direction="row"
          spacing="0.8rem"
          sx={{
            position: "relative",
            zIndex: 1,
            width: "min-content",
            alignItems: "center",
            padding: "1.6rem",
            backgroundColor: "background.default",
          }}
          onClick={handleToggleGasPricePanel}
        >
          <GasPriveDotSvg></GasPriveDotSvg>
          <Typography component="span" sx={{ fontFamily: "var(--developer-page-font-family)", fontSize: "1.6rem", lineHeight: "2.4rem" }}>
            {displayedScrollGasPrice}
          </Typography>
          <Typography component="span" sx={{ fontSize: "1.6rem", lineHeight: "2.4rem" }}>
            Mwei
          </Typography>
        </Stack>
        <Collapse in={gasPricePanelVisible} sx={{ width: "100%" }} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr max-content",
              rowGap: "2.4rem",
              columnGap: "0.8rem",
              padding: "0.8rem 1.6rem 1.6rem",
              fontSize: "1.6rem",
              lineHeight: "2.4rem",
              color: "text.primary",

              position: "relative",
              zIndex: 1,
            }}
          >
            <span className="font-[600]">Scroll</span>
            <Typography sx={{ fontSize: "inherit", lineHeight: "inherit", textAlign: "right", fontFamily: "var(--developer-page-font-family)" }}>
              {displayedScrollGasPrice}
            </Typography>
            <span>Mwei</span>
            <span className="font-[600]">Ethereum</span>
            <Typography sx={{ fontSize: "inherit", lineHeight: "inherit", textAlign: "right", fontFamily: "var(--developer-page-font-family)" }}>
              {displayedEthereumGasPrice}
            </Typography>
            <span>Mwei</span>
            <Button
              sx={{
                fontSize: "1.6rem",
                lineHeight: "2.4rem",
                gridColumn: "1 / -1",
                p: "0.8rem 2.4rem",
                height: "4rem",
              }}
              onClick={handleAddScrollToWallet}
            >
              Add Scroll to Wallet
            </Button>
          </Box>
        </Collapse>
      </MotionBox>

      <RequestWarning severity="success" open={warningVisible} onClose={handleCloseWarning}>
        You are already on <b>{NETWORKS.find(item => item.chainId === CHAIN_ID.L2)!.name}</b>.
      </RequestWarning>
    </Box>
  )
}

export default MobileGasPriceViewer
