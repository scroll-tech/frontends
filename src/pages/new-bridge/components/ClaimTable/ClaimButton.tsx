import dayjs from "dayjs"
import { ethers } from "ethers"
import { isError } from "ethers"
import { useState } from "react"
import Countdown from "react-countdown"

import { Box, ButtonBase, Chip, CircularProgress, SvgIcon, Tooltip, alpha } from "@mui/material"
import { styled } from "@mui/system"

import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import { ReactComponent as InfoSvg } from "@/assets/svgs/refactor/bridge-info.svg"
import { TX_STATUS } from "@/constants"
import { CHAIN_ID } from "@/constants/common"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { ClaimStatus } from "@/stores/claimStore"
import useTxStore, { TxPosition, isValidOffsetTime } from "@/stores/txStore"
import { requireEnv, sentryDebug, switchNetwork } from "@/utils"

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
  "&.waiting": {
    backgroundColor: theme.palette.themeBackground.normal,
    color: "#8C591A",
  },
  "&.claimed": {
    backgroundColor: "#DFFCF8",
    color: "#0F8E7E",
  },
  "&.failed": {
    backgroundColor: "#FFE1DB",
    color: "#FF684B",
  },
}))

const ClaimButton = props => {
  const { tx, txStatus, loading, changeLoading } = props
  const { networksAndSigners, blockNumbers } = useBrigeContext()
  const { chainId, walletCurrentAddress } = useRainbowContext()
  const [claimButtonLabel, setClaimButtonLabel] = useState("Claim")
  const { updateTransaction, addEstimatedTimeMap, updateOrderedTxs, removeFrontTransactions } = useTxStore()

  const renderEstimatedWaitingTime = initialUTCStr => {
    if (!initialUTCStr) {
      return <>{tx.isL1 ? "Ready" : "Claimable"} in ...</>
    }
    const timestamp = dayjs(tx.initiatedAt).add(1, "h").valueOf()

    return <Countdown date={timestamp} renderer={renderCountDown}></Countdown>
  }

  const renderCountDown = ({ total, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>Pending</>
    }
    return (
      <>
        {tx.isL1 ? "Ready" : "Claimable"} in ~{minutes ? `${minutes}m` : `${seconds}s`}
      </>
    )
  }

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
      changeLoading(true)
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
          changeLoading(false)
        })
    } catch (error) {
      if (isError(error, "ACTION_REJECTED")) {
        addEstimatedTimeMap(`claim_${tx.hash}`, 0)
      }

      changeLoading(false)
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
        <StyledChip
          className="failed"
          color="primary"
          label={
            <>
              <span>Failed</span>
              <SvgIcon sx={{ fontSize: "1.6rem", ml: "0.4rem" }} component={InfoSvg} inheritViewBox></SvgIcon>
            </>
          }
        ></StyledChip>
      </Tooltip>
    )
  } else if (txStatus === ClaimStatus.CLAIMED) {
    return <StyledChip className="claimed" color="primary" label="Claimed"></StyledChip>
  } else if (txStatus === ClaimStatus.CLAIMING || loading) {
    return (
      <StyledChip
        className="loading"
        label={
          <>
            <span>Claiming</span>
            <CircularProgress size={15} sx={{ ml: "0.4rem" }} color="inherit" />
          </>
        }
      ></StyledChip>
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
      title="Scroll provers are still finalizing your transaction, this can take up to 1 hour. Once done, you'll be able to claim it here for use on the target network."
    >
      <StyledChip className="waiting" label={<>{renderEstimatedWaitingTime(tx.initiatedAt)}</>}></StyledChip>
    </Tooltip>
  )
}

export default ClaimButton
