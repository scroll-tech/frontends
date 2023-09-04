import { useState } from "react"

import { Box, ButtonBase, Chip, CircularProgress, Tooltip, alpha } from "@mui/material"
import { styled } from "@mui/system"

import { CHAIN_ID } from "@/constants/common"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"
import { switchNetwork } from "@/utils"

import { useRetry } from "../../hooks/useRetry"

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  width: "15rem",
  height: "4rem",
  fontSize: "1.4rem",
  fontWeight: 600,

  borderRadius: "0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  width: "15rem",
  height: "4rem",
  fontSize: "1.4rem",
  fontWeight: 600,
  padding: 0,
  borderRadius: "2rem",
  verticalAlign: "middle",

  ".MuiChip-label": {
    display: "flex",
    alignItems: "center",
  },

  "&.loading": {
    borderRadius: "0.5rem",
    backgroundColor: alpha(theme.palette.primary.main, 0.6),
    color: theme.palette.primary.contrastText,
  },
}))

const RetryButton = props => {
  const { tx } = props
  const { chainId } = useRainbowContext()
  const [retryButtonLabel, setRetryButtonLabel] = useState("Retry")
  const { replayMessage, loading } = useRetry({ hash: tx.hash })
  const { estimatedTimeMap } = useTxStore()

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
    }
  }

  // The estimated retry time will not exceed 2 hours.
  if (loading || estimatedTimeMap[`retry_${tx.hash}`] + 1000 * 60 * 60 * 2 > Date.now()) {
    return (
      <StyledChip
        className="loading"
        label={
          <>
            <span>Retrying</span>
            <CircularProgress size={15} sx={{ ml: "0.4rem" }} color="inherit" />
          </>
        }
      ></StyledChip>
    )
  }

  const isOnScrollLayer1 = chainId === CHAIN_ID.L1

  if (isOnScrollLayer1) {
    return (
      <StyledButton className="" color="primary" onClick={replayMessage}>
        Retry
      </StyledButton>
    )
  }
  return (
    <Tooltip placement="top" title="Please connect to the L1 network to retry your deposit.">
      <Box>
        <StyledButton
          onMouseEnter={() => setRetryButtonLabel("Switch")}
          onMouseLeave={() => setRetryButtonLabel("Retry")}
          onClick={() => handleSwitchNetwork(CHAIN_ID.L1)}
        >
          {retryButtonLabel}
        </StyledButton>
      </Box>
    </Tooltip>
  )
}

export default RetryButton
