import { ethers } from "ethers"
import { useState } from "react"

import { Box, CircularProgress, Tooltip } from "@mui/material"
import { styled } from "@mui/system"

import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import { CHAIN_ID } from "@/constants/common"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"
import { switchNetwork } from "@/utils"

const StyledButton = styled("button")(({ theme }) => ({
  width: "8.6rem",
  height: "2.8rem",
  lineHeight: "3rem",
  borderRadius: "14px",
  color: "#ffffff",
  fontWeight: 600,
  background: theme.palette.primary.main,
  cursor: "pointer",
  "&:disabled": {
    background: theme.palette.primary.disabled,
  },
  "&.claimed": {
    background: " #DFFCF8",
    color: "#0F8E7E",
  },
  "&.claiming": {},
  "&.pending": {
    background: "#F0F0F0",
    color: "#5B5B5B",
  },
}))

const ClaimButton = props => {
  const { tx, isFinalized } = props
  const { networksAndSigners } = useApp()
  const { chainId } = useRainbowContext()
  const [claimButtonLabel, setClaimButtonLabel] = useState("Claim")
  //   const { classes, cx } = useStyles()

  const [loading, setLoading] = useState(false)

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
    }
  }

  const handleClaim = async claimInfo => {
    const contract = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, networksAndSigners[chainId as number].signer)
    const { from, to, value, nonce, message, proof, batch_index } = claimInfo
    try {
      setLoading(true)
      const tx = await contract.relayMessageWithProof(from, to, value, nonce, message, {
        batchIndex: batch_index,
        merkleProof: proof,
      })

      await tx.wait()
    } catch (error) {
      console.log(error.toString())
      // alert(error)
      setLoading(false)
    }
  }

  const isOnScrollLayer1 = chainId === CHAIN_ID.L1

  if (isFinalized) {
    if (isOnScrollLayer1) {
      return (
        <StyledButton className="" onClick={() => handleClaim(tx.claimInfo)} disabled={loading} color="primary">
          Claim {loading ? <CircularProgress size={16} sx={{ position: "absolute", right: "0.8rem" }} color="inherit" /> : null}
        </StyledButton>
      )
    } else {
      return (
        <Tooltip placement="top" title="Please connect to the L1 network to claim your withdrawal.">
          <Box>
            <StyledButton
              onMouseEnter={() => setClaimButtonLabel("Switch")}
              onMouseLeave={() => setClaimButtonLabel("Claim")}
              onClick={() => handleSwitchNetwork(CHAIN_ID.L1)}
            >
              {claimButtonLabel}
            </StyledButton>
          </Box>
        </Tooltip>
      )
    }
  } else {
    return (
      <Tooltip
        placement="top"
        title="Scroll provers are still finalizing your transaction, this can take up to 4 hours. Once done, you'll be able to claim it here for use on the target network."
      >
        <Box>
          <StyledButton className="pending">Claim</StyledButton>
        </Box>
      </Tooltip>
    )
  }
}

export default ClaimButton