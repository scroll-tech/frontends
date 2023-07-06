import { ethers } from "ethers"
import { useCallback, useMemo, useState } from "react"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import InfoIcon from "@mui/icons-material/Info"
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"

import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import Link from "@/components/Link"
import { TX_STATUS } from "@/constants"
import { CHAIN_ID } from "@/constants/common"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTokenInfo from "@/hooks/useTokenInfo"
import useTxStore from "@/stores/txStore"
import { generateExploreLink, switchNetwork, toTokenDisplay, truncateHash } from "@/utils"
import { requireEnv } from "@/utils"

import StatusChip from "./StatusChip"

const useStyles = makeStyles()(theme => {
  return {
    tableContainer: {
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "1.6rem",
        overflowX: "scroll",
      },
    },
    tableWrapper: {
      boxShadow: "unset",
      border: `1px solid ${theme.palette.border.main}`,
      width: "74rem",
    },
    tableTitle: {
      marginTop: "2.8rem",
      marginBottom: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.6rem",
        marginBottom: "1.6rem",
      },
    },
    tableHeader: {
      backgroundColor: theme.palette.scaleBackground.primary,
      ".MuiTableCell-head": {
        borderBottom: "unset",
      },
    },
    claimButton: {
      width: "10.2rem",
    },
    chip: {
      width: "12.6rem",
      height: "3.8rem",
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    pendingChip: {
      color: theme.palette.tagWarning.main,
      backgroundColor: theme.palette.tagWarning.light,
    },
    successChip: {
      color: theme.palette.tagSuccess.main,
      backgroundColor: theme.palette.tagSuccess.light,
    },
    claimedChip: {
      color: theme.palette.tagSuccess.main,
      backgroundColor: theme.palette.tagSuccess.light,
    },
    pagination: {
      ".MuiPaginationItem-text": {
        fontSize: "1.6rem",
      },
      ".MuiPaginationItem-root": {
        color: theme.palette.text.secondary,
      },
      ".MuiPaginationItem-root.Mui-selected": {
        fontWeight: 700,
        backgroundColor: "unset",
      },
      ".MuiSvgIcon-root": {
        fontSize: "2.4rem",
      },
    },
  }
})

const TxTable = (props: any) => {
  const { data, pagination, loading } = props
  const { classes } = useStyles()

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <>
      <div className={classes.tableContainer}>
        <TableContainer component={Paper} className={classes.tableWrapper}>
          <Table aria-label="Tx Table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Claimed</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Txn Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {data?.map((tx: any) => (
                    <TxRow key={tx.hash} tx={tx} />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {pagination && (
        <div className="flex justify-end mt-[2.8rem]">
          <Pagination
            size="small"
            classes={{
              root: classes.pagination,
            }}
            page={pagination?.page}
            count={pagination?.count}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  )
}

const TxRow = props => {
  const { tx } = props
  const { estimatedTimeMap } = useTxStore()
  const { networksAndSigners } = useApp()
  const { chainId } = useRainbowContext()
  const [claimButtonLabel, setClaimButtonLabel] = useState("Claim")
  const { classes, cx } = useStyles()

  const [loading, setLoading] = useState(false)

  const {
    txHistory: { blockNumbers },
  } = useApp()

  const txStatus = useCallback(
    (blockNumber, assumedStatus, isL1, to) => {
      if (assumedStatus && !to) {
        return assumedStatus
      }
      if (assumedStatus && to) {
        return TX_STATUS.empty
      }
      if (blockNumber && blockNumbers && blockNumbers[+!(isL1 ^ to)] >= blockNumber) {
        return TX_STATUS.success
      }
      return TX_STATUS.pending
    },
    [blockNumbers],
  )

  const fromStatus = useMemo(() => {
    return txStatus(tx.fromBlockNumber, tx.assumedStatus, tx.isL1, false)
  }, [tx, txStatus])

  const toStatus = useMemo(() => {
    return txStatus(tx.toBlockNumber, tx.assumedStatus, tx.isL1, true)
  }, [tx, txStatus])

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, tx.isL1)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const renderEstimatedWaitingTime = (timestamp, isL1, to) => {
    if (fromStatus === TX_STATUS.success) {
      return null
    } else if (timestamp === 0) {
      return <Typography variant="body2">Estimating...</Typography>
    } else if (timestamp) {
      return (
        <Typography variant="body2" color="textSecondary">
          <Countdown date={timestamp} renderer={renderCountDown}></Countdown>
        </Typography>
      )
    }
    return null
  }

  const renderCountDown = ({ total, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <LinearProgress />
    }
    return (
      <span>
        estimated waiting time: {hours}h {minutes}m {seconds}s
      </span>
    )
  }

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      // cancel switch network in MetaMask would not throw error and the result is null just like successfully switched
      await switchNetwork(chainId)
    } catch (error) {
      // when there is a switch-network popover in MetaMask and refreshing page would throw an error
      console.log(error, "error")
    }
  }

  const renderClaimButton = tx => {
    if (tx.isL1) return null
    if (tx.isClaimed) {
      return <Chip label="Claimed" className={cx(classes.chip, classes.claimedChip)} />
    }

    const isOnScrollLayer1 = chainId === CHAIN_ID.L1
    if (tx.isFinalized) {
      if (isOnScrollLayer1) {
        return (
          <Button className={classes.claimButton} onClick={() => handleClaim(tx.claimInfo)} disabled={loading} color="primary" variant="contained">
            Claim {loading ? <CircularProgress size={16} sx={{ position: "absolute", right: "0.8rem" }} color="inherit" /> : null}
          </Button>
        )
      } else {
        return (
          <Tooltip placement="top" title="Please connect to the L1 network to claim your withdrawal.">
            <Box>
              <Button
                className={classes.claimButton}
                onMouseEnter={() => setClaimButtonLabel("Switch")}
                onMouseLeave={() => setClaimButtonLabel("Claim")}
                onClick={() => handleSwitchNetwork(CHAIN_ID.L1)}
              >
                {claimButtonLabel}
              </Button>
            </Box>
          </Tooltip>
        )
      }
    } else {
      return (
        <Tooltip
          placement="top"
          title="Our provers are still finalizing your transaction on Scroll ALPHA Testnet, when it has finalized you can come back and claim your transaction. This usually takes 1-4 hours after your transaction has been submitted on the bridge."
        >
          <Box>
            <Button className={classes.claimButton} disabled>
              Claim
            </Button>
          </Box>
        </Tooltip>
      )
    }
  }

  const handleClaim = async claimInfo => {
    const contract = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, networksAndSigners[chainId as number].signer)
    const { from, to, value, nonce, message, proof, batch_hash } = claimInfo
    try {
      setLoading(true)
      const tx = await contract.relayMessageWithProof(from, to, value, nonce, message, {
        batchHash: batch_hash,
        merkleProof: "0x" + proof,
      })
      await tx.wait()
      console.log("Transaction hash:", tx.hash)
    } catch (error) {
      console.log(error)
      alert(error)
      setLoading(false)
    }
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>{renderClaimButton(tx)}</TableCell>
      <TableCell>
        <Typography>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          {blockNumbers ? (
            <>
              {fromStatus === TX_STATUS.failed ? (
                <Tooltip title={tx.errMsg}>
                  <Box>
                    <StatusChip sx={{ cursor: "pointer" }} status={fromStatus}>
                      {fromStatus}
                      <InfoIcon sx={{ fontSize: "inherit" }}></InfoIcon>
                    </StatusChip>
                  </Box>
                </Tooltip>
              ) : (
                <StatusChip status={fromStatus}>{fromStatus}</StatusChip>
              )}

              <StatusChip status={toStatus}>{toStatus}</StatusChip>
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" width="12.6rem" height="3.8rem" className="rounded-[1.6rem]" />
              <Skeleton variant="rectangular" width="12.6rem" height="3.8rem" className="rounded-[1.6rem]" />
            </>
          )}
        </Stack>
      </TableCell>
      <TableCell sx={{ width: "30rem" }}>
        <Stack direction="column">
          <Typography>From {tx.fromName}: </Typography>
          <Link external href={generateExploreLink(tx.fromExplore, tx.hash)} className="leading-normal flex-1">
            {truncateHash(tx.hash)}
          </Link>

          {!tx.fromBlockNumber && !tx.assumedStatus && <LinearProgress />}
          {renderEstimatedWaitingTime(estimatedTimeMap[`from_${tx.hash}`], tx.isL1, false)}
        </Stack>

        <Stack direction="column" className="mt-[1.2rem]">
          <Typography>To {tx.toName}: </Typography>
          {tx.toHash ? (
            <Link external href={generateExploreLink(tx.toExplore, tx.toHash)} className="leading-normal flex-1">
              {truncateHash(tx.toHash)}
            </Link>
          ) : (
            <span className="leading-normal flex-1">-</span>
          )}
          {renderEstimatedWaitingTime(estimatedTimeMap[`to_${tx.toHash}`], tx.isL1, true)}
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TxTable
