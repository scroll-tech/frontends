import { ethers } from "ethers"
import { isError } from "ethers"
import { useState } from "react"

import { Box, CircularProgress, Tooltip } from "@mui/material"
import { styled } from "@mui/system"

import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import { TX_STATUS } from "@/constants"
import { CHAIN_ID } from "@/constants/common"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { ClaimStatus } from "@/stores/claimStore"
import useTxStore, { TxPosition, isValidOffsetTime } from "@/stores/txStore"
import { requireEnv, sentryDebug, switchNetwork } from "@/utils"

const StyledButton = styled("button")(({ theme }) => ({
  width: "8.6rem",
  height: "2.8rem",
  borderRadius: "14px",
  color: "#ffffff",
  fontWeight: 600,
  background: theme.palette.primary.main,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&.disabled": {
    background: "#F0F0F0",
    color: "#5B5B5B",
  },
  "&.claimed": {
    background: " #DFFCF8",
    color: "#0F8E7E",
  },
  "&.failed": {
    background: "#5B5B5B",
    color: "#FFFFFF",
  },
}))

const ClaimButton = props => {
  const { tx, txStatus } = props
  const { networksAndSigners, blockNumbers } = useApp()
  const { chainId, walletCurrentAddress } = useRainbowContext()
  const [claimButtonLabel, setClaimButtonLabel] = useState("Claim")
  const { updateTransaction, addEstimatedTimeMap, updateOrderedTxs, removeFrontTransactions } = useTxStore()

  const [loading, setLoading] = useState(false)

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
    }
  }

  const handleClaim = async () => {
    const contract = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, networksAndSigners[chainId as number].signer)
    const { from, to, value, nonce, message, proof, batch_index } = tx.claimInfo
    try {
      setLoading(true)
      addEstimatedTimeMap(`claim_${tx.hash}`, Date.now())
      const result = await contract.relayMessageWithProof(from, to, value, nonce, message, {
        batchIndex: batch_index,
        merkleProof: proof,
      })
      result
        .wait()
        .then(receipt => {
          if (receipt?.status === 1) {
            const estimatedOffsetTime = (receipt.blockNumber - blockNumbers[0]) * 12 * 1000
            if (isValidOffsetTime(estimatedOffsetTime)) {
              addEstimatedTimeMap(`to_${receipt.blockHash}`, Date.now() + estimatedOffsetTime)
              addEstimatedTimeMap(`claim_${tx.hash}`, Date.now() + estimatedOffsetTime)
            } else {
              addEstimatedTimeMap(`to_${receipt.blockHash}`, 0)
              addEstimatedTimeMap(`claim_${tx.hash}`, 0)
            }
          } else {
            const errorMessage = "due to any operation that can cause the transaction or top-level call to revert"
            //Something failed in the EVM
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
            //EIP - 658
            markTransactionAbnormal(tx, TX_STATUS.failed, errorMessage)
            addEstimatedTimeMap(`claim_${tx.hash}`, 0)
          }
        })
        .catch(error => {
          // TRANSACTION_REPLACED or TIMEOUT
          sentryDebug(error.message)
          if (isError(error, "TRANSACTION_REPLACED")) {
            if (error.cancelled) {
              markTransactionAbnormal(tx, TX_STATUS.canceled, "transaction was cancelled")
              updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
              // setSendError("cancel")
            } else {
              const { blockNumber } = error.receipt
              const estimatedOffsetTime = (blockNumber - blockNumbers[0]) * 12 * 1000
              if (isValidOffsetTime(estimatedOffsetTime)) {
                addEstimatedTimeMap(`from_${tx.hash}`, Date.now() + estimatedOffsetTime)
              } else {
                addEstimatedTimeMap(`claim_${tx.hash}`, 0)
                sentryDebug(`safe block number: ${blockNumbers[0]}`)
              }
            }
          } else {
            // setSendError(error)
            // when the transaction execution failed (status is 0)
            updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Abnormal)
            markTransactionAbnormal(tx, TX_STATUS.failed, error.message)
            addEstimatedTimeMap(`claim_${tx.hash}`, 0)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (error) {
      if (isError(error, "ACTION_REJECTED")) {
        addEstimatedTimeMap(`claim_${tx.hash}`, 0)
      }

      setLoading(false)
    }
  }

  const markTransactionAbnormal = (tx, assumedStatus, errMsg) => {
    // addAbnormalTransactions(walletCurrentAddress, {
    //   hash: tx.hash,
    //   fromName: fromNetwork.name,
    //   toName: toNetwork.name,
    //   fromExplore: fromNetwork.explorer,
    //   toExplore: toNetwork.explorer,
    //   amount: parsedAmount.toString(),
    //   isL1: fromNetwork.name === NETWORKS[0].name,
    //   symbolToken: selectedToken.address,
    //   assumedStatus,
    //   errMsg,
    // })
    removeFrontTransactions(tx.hash)
    updateTransaction(tx.hash, { assumedStatus })
  }

  if (txStatus === ClaimStatus.FAILED) {
    return (
      <Tooltip placement="top" title={tx.errMsg || tx.assumedStatus}>
        <StyledButton className="failed" color="primary">
          Failed{" "}
          <svg style={{ marginLeft: "4px" }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 12.75C10.175 12.75 12.75 10.175 12.75 7C12.75 3.825 10.175 1.25 7 1.25C3.825 1.25 1.25 3.825 1.25 7C1.25 10.175 3.825 12.75 7 12.75ZM7 14C10.865 14 14 10.865 14 7C14 3.135 10.865 0 7 0C3.135 0 0 3.135 0 7C0 10.865 3.135 14 7 14Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 5.56C7.345 5.56 7.625 5.84 7.625 6.185V10.185C7.625 10.53 7.345 10.81 7 10.81C6.655 10.81 6.375 10.53 6.375 10.185V6.185C6.375 5.84 6.655 5.56 7 5.56Z"
              fill="currentColor"
            />
            <path
              d="M7 4.435C7.34518 4.435 7.625 4.15518 7.625 3.81C7.625 3.46482 7.34518 3.185 7 3.185C6.65482 3.185 6.375 3.46482 6.375 3.81C6.375 4.15518 6.65482 4.435 7 4.435Z"
              fill="currentColor"
            />
          </svg>
        </StyledButton>
      </Tooltip>
    )
  } else if (txStatus === ClaimStatus.CLAIMED) {
    return (
      <StyledButton className="claimed" color="primary">
        Claimed
      </StyledButton>
    )
  } else if (txStatus === ClaimStatus.CLAIMING || loading) {
    return (
      <StyledButton className="" disabled color="primary">
        Claiming <CircularProgress size={10} sx={{ marginLeft: "0.5rem" }} color="inherit" />
      </StyledButton>
    )
  } else if (txStatus === ClaimStatus.CLAIMABLE) {
    const isOnScrollLayer1 = chainId === CHAIN_ID.L1

    if (isOnScrollLayer1) {
      return (
        <StyledButton className="" color="primary" onClick={handleClaim}>
          Claim
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
  }
  // ClaimStatus.NOT_READY
  return (
    <Tooltip
      placement="top"
      title="Scroll provers are still finalizing your transaction, this can take up to 4 hours. Once done, you'll be able to claim it here for use on the target network."
    >
      <Box>
        <StyledButton className="disabled">Claim</StyledButton>
      </Box>
    </Tooltip>
  )
}

export default ClaimButton
