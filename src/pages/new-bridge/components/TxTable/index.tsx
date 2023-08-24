import dayjs from "dayjs"
import { useCallback, useMemo } from "react"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import {
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
  Typography,
} from "@mui/material"

import Link from "@/components/Link"
import { TX_STATUS } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useLastBlockNums } from "@/hooks/useRollupInfo"
import useTokenInfo from "@/hooks/useTokenInfo"
import useTxStore from "@/stores/txStore"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import TxStatusButton from "./TxStatusButton"

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
      borderRadius: "20px",
      width: "68.8rem",
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      padding: "2.5rem 3rem",
      [theme.breakpoints.down("sm")]: {
        width: "calc(100vw - 4rem)",
      },
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
      borderBottom: `3px solid ${theme.palette.border.main}`,
      ".MuiTableCell-head": {
        borderBottom: "unset",
        fontWeight: 600,
        fontSize: "1.6rem",
        padding: "0.8rem 1.6rem",
        color: theme.palette.text.primary,
        "&:first-of-type": {
          paddingLeft: 0,
        },
      },
    },
    tableBody: {
      ".MuiTableCell-root": {
        verticalAlign: "top",
        padding: "2rem",
        "*": {
          fontSize: "1.4rem",
        },
        "&:first-of-type": {
          paddingLeft: 0,
        },
        "&:last-of-type": {
          paddingRight: 0,
        },
      },
    },
    chip: {
      width: "8.6rem",
      height: "2.8rem",
      fontSize: "1.4rem",
      fontWeight: 600,
      borderRadius: "10rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    pendingChip: {
      color: "#FFF8F3",
      backgroundColor: "#FF684B",
    },
    successChip: {
      color: "#0F8E7E",
      backgroundColor: "#DFFCF8",
    },
    failedChip: {
      color: "#FFF8F3",
      background: "#5B5B5B",
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
        color: theme.palette.text.primary,
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
  const { data, loading, pagination } = props
  const { classes } = useStyles()
  const { lastBlockNums } = useLastBlockNums()

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell sx={{ width: "12rem" }}>Action</TableCell>
              <TableCell align="left">Initiated At</TableCell>
              <TableCell>Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {data?.map((tx: any) => (
                  <TxRow finalizedIndex={lastBlockNums?.finalized_index ?? 0} key={tx.hash} tx={tx} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {pagination && (
          <div className="flex justify-center mt-[2rem]">
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
      </TableContainer>
    </>
  )
}

const TxRow = props => {
  const { tx, finalizedIndex } = props
  const { estimatedTimeMap } = useTxStore()

  const { blockNumbers } = useApp()

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
        Ready in {minutes}m {seconds}s (estimate)
      </span>
    )
  }

  const formatDate = (inputStr: string): string => {
    const date = dayjs(inputStr)
    return inputStr ? date.format("DD/MM/YYYY HH:mm:ss") : "-"
  }

  const actionText = tx => {
    if (tx.isL1) {
      return `Deposit to Scroll`
    } else {
      return `Withdraw to Ethereum`
    }
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          <TxStatusButton finalizedIndex={finalizedIndex} toStatus={toStatus} fromStatus={fromStatus} tx={tx} />
        </Stack>
      </TableCell>

      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>{actionText(tx)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>
          <span>{formatDate(tx.initiatedAt)}</span>
        </Typography>
      </TableCell>

      <TableCell sx={{ width: "21rem" }}>
        <Stack direction="column">
          <Typography>
            {tx.isL1 ? "Ethereum" : "Scroll"}:{" "}
            <Link external sx={{ color: "#396CE8" }} href={generateExploreLink(tx.fromExplore, tx.hash)} className="leading-normal flex-1">
              {truncateHash(tx.hash)}
            </Link>
          </Typography>

          {!tx.fromBlockNumber && !tx.assumedStatus && <LinearProgress />}
          {renderEstimatedWaitingTime(estimatedTimeMap[`from_${tx.hash}`], tx.isL1, false)}
        </Stack>

        <Stack direction="column" className="mt-[0.4rem]">
          <Typography>
            {tx.isL1 ? "Scroll" : "Ethereum"}:{" "}
            {tx.toHash ? (
              <Link external sx={{ color: "#396CE8" }} href={generateExploreLink(tx.toExplore, tx.toHash)} className="leading-normal flex-1">
                {truncateHash(tx.toHash)}
              </Link>
            ) : (
              <span className="leading-normal flex-1">-</span>
            )}{" "}
          </Typography>

          {renderEstimatedWaitingTime(estimatedTimeMap[`to_${tx.toHash}`], tx.isL1, true)}
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TxTable
