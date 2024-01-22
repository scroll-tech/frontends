import { useState } from "react"

import { Box, ButtonBase, Chip, CircularProgress, Tooltip, alpha } from "@mui/material"
import { styled } from "@mui/system"

import { CHAIN_ID } from "@/constants/common"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useClaim } from "@/hooks/useClaim"
import { useRetry } from "@/hooks/useRetry"
import useTxStore from "@/stores/txStore"
import { switchNetwork } from "@/utils"

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

const ActiveButton = props => {
  const { tx, type } = props
  const { chainId } = useRainbowContext()
  const [activeButtonLabel, setActiveButtonLabel] = useState(type)
  const { replayMessage, loading: retryLoading } = useRetry({ hash: tx.hash })
  const { relayMessageWithProof, loading: claimLoading } = useClaim({ tx })
  const { estimatedTimeMap } = useTxStore()

  const actionMap = {
    Claim: {
      label: "Claim",
      onClick: relayMessageWithProof,
      tooltip: "Please connect to the L1 network to claim.",
    },
    Retry: {
      label: "Retry",
      onClick: replayMessage,
      tooltip: "Please connect to the L1 network to retry your deposit.",
    },
  }

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
    }
  }

  // The estimated retry / claim time will not exceed 30 mins.
  if (claimLoading || retryLoading || estimatedTimeMap[`progress_${tx.hash}`] > Date.now()) {
    return (
      <StyledChip
        className="loading"
        label={
          <>
            <span>{type}ing</span>
            <CircularProgress size={15} sx={{ ml: "0.4rem" }} color="inherit" />
          </>
        }
      ></StyledChip>
    )
  }

  const isOnScrollLayer1 = chainId === CHAIN_ID.L1

  if (isOnScrollLayer1) {
    return (
      <StyledButton className="" color="primary" onClick={actionMap[type].onClick}>
        {type}
      </StyledButton>
    )
  }
  return (
    <Tooltip placement="top" title={actionMap[type].tooltip}>
      <Box>
        <StyledButton
          onMouseEnter={() => setActiveButtonLabel("Switch")}
          onMouseLeave={() => setActiveButtonLabel(type)}
          onClick={() => handleSwitchNetwork(CHAIN_ID.L1)}
        >
          {activeButtonLabel}
        </StyledButton>
      </Box>
    </Tooltip>
  )
}

export default ActiveButton
