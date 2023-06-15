import { ethers } from "ethers"
import { useCallback, useMemo, useState } from "react"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

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
import { ChainId } from "@/constants/common"
import { useApp } from "@/contexts/AppContextProvider"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import useTokenInfo from "@/hooks/useTokenInfo"
import useTxStore from "@/stores/txStore"
import { toTokenDisplay } from "@/utils"
import { generateExploreLink, switchNetwork, truncateHash } from "@/utils"

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
      width: "70rem",
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
                <TableCell></TableCell>
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
  const { chainId } = useWeb3Context()
  const [claimButtonLabel, setClaimButtonLabel] = useState("Claim")

  const [loading, setLoading] = useState(false)

  const {
    txHistory: { blockNumbers },
  } = useApp()

  const { classes, cx } = useStyles()

  const txStatus = useCallback(
    (blockNumber, isL1, to, toBlockNumber = undefined) => {
      if (!blockNumber || !blockNumbers) {
        return "Pending"
      }
      if (blockNumbers[+!(isL1 ^ to)] >= blockNumber) {
        return "Success"
      }
      // for compatibility with old safe block number
      // if to tx succeeded, then from tx should succeed too.
      if (isL1 && !to && toBlockNumber && toBlockNumber <= blockNumbers[1]) {
        return "Success"
      }
      return "Pending"
    },
    [blockNumbers],
  )

  const fromStatus = useMemo(() => {
    return txStatus(tx.fromBlockNumber, tx.isL1, false, tx.toBlockNumber)
  }, [tx, txStatus])

  const toStatus = useMemo(() => {
    return txStatus(tx.toBlockNumber, tx.isL1, true)
  }, [tx, txStatus])

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, tx.isL1)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const renderEstimatedWaitingTime = (timestamp, isL1, to) => {
    if (fromStatus === "Success") {
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
    if (tx.isL1 || !tx.isClaimed) return null

    const isOnScrollLayer1 = chainId === ChainId.SCROLL_LAYER_1
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
                onClick={() => handleSwitchNetwork(ChainId.SCROLL_LAYER_1)}
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
    const contract = new ethers.Contract(
      "0x326517Eb8eB1Ce5eaB5b513C2e9A24839b402d90",
      L1ScrollMessenger,
      networksAndSigners[chainId as number].signer,
    )
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
              <Chip label={fromStatus} className={cx(classes.chip, fromStatus === "Success" ? classes.successChip : classes.pendingChip)} />
              <Chip label={toStatus} className={cx(classes.chip, toStatus === "Success" ? classes.successChip : classes.pendingChip)} />
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
          {!tx.fromBlockNumber && <LinearProgress />}
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
