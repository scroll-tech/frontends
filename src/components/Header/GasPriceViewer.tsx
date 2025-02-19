import { useMemo, useState } from "react"
import { formatUnits } from "viem"
import { useGasPrice } from "wagmi"

import { Box, Button, Fade, Paper, Popper, Stack, Typography } from "@mui/material"

import GasPriveDotSvg from "@/assets/svgs/header/gas-price-dot.svg"
import RequestWarning from "@/components/RequestWarning"
import { CHAIN_ID } from "@/constants"
import { NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

const GasPriceViewer = () => {
  const { chainId } = useRainbowContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [warningVisible, setwarningVisible] = useState(false)
  const { data: ethereumGasPrice } = useGasPrice({ chainId: CHAIN_ID.L1, query: { refetchInterval: 1000 * 60 * 1 } })

  const { data: scrollGasPrice } = useGasPrice({
    chainId: CHAIN_ID.L2,
    query: { refetchInterval: 1000 * 60 * 1 },
  })

  const displayedScrollGasPrice = useMemo(() => {
    if (scrollGasPrice) {
      return Number(formatUnits(scrollGasPrice, 6)).toFixed(2)
    }
    return "-"
  }, [scrollGasPrice])

  const displayedEthereumGasPrice = useMemo(() => {
    if (ethereumGasPrice) {
      return Number(formatUnits(ethereumGasPrice, 6)).toFixed(2)
    }
    return "-"
  }, [ethereumGasPrice])

  const handleOpenPopover = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const handleAddScrollToWallet = async () => {
    if (chainId === CHAIN_ID.L2) {
      setwarningVisible(true)
      setAnchorEl(null)
    } else {
      await switchNetwork(CHAIN_ID.L2)
    }
  }

  const handleCloseWarning = () => {
    setwarningVisible(false)
  }

  return (
    <Box>
      <Stack
        direction="row"
        spacing="0.8rem"
        sx={{
          alignItems: "center",
          borderRadius: "0.8rem",
          bgcolor: "background.default",
          padding: "0.8rem 1.6rem",
        }}
        onMouseEnter={handleOpenPopover}
        onMouseLeave={handleClosePopover}
      >
        <GasPriveDotSvg></GasPriveDotSvg>
        <Typography component="span" sx={{ fontFamily: "var(--developer-page-font-family)", fontSize: "1.6rem", lineHeight: "2.4rem" }}>
          {displayedScrollGasPrice}
        </Typography>
        <Typography component="span" sx={{ fontSize: "1.6rem", lineHeight: "2.4rem" }}>
          Mwei
        </Typography>
        <Popper
          open={Boolean(anchorEl)}
          sx={{
            zIndex: theme => theme.zIndex.appBar,
          }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 12],
              },
            },
          ]}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  borderRadius: "1rem",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.10)",
                  display: "grid",
                  gridTemplateColumns: "max-content 1fr max-content",
                  rowGap: "2.4rem",
                  columnGap: "0.8rem",
                  padding: "2.4rem",
                  width: "24.6rem",
                  fontSize: "1.6rem",
                  lineHeight: "2.4rem",
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
              </Paper>
            </Fade>
          )}
        </Popper>
      </Stack>

      <RequestWarning severity="success" open={warningVisible} onClose={handleCloseWarning}>
        You are already on <b>{NETWORKS.find(item => item.chainId === CHAIN_ID.L2)!.name}</b>.
      </RequestWarning>
    </Box>
  )
}

export default GasPriceViewer
