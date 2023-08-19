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
import useTokenInfo from "@/hooks/useTokenInfo"
import useTxStore from "@/stores/txStore"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

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
      width: "62.8rem",
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      padding: "2.5rem 3rem",
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
      },
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

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="left">Initiated At</TableCell>
              {/* <TableCell>Finalised At</TableCell> */}
              <TableCell>Action</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
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
  const { tx } = props
  const { estimatedTimeMap } = useTxStore()

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

  const formatDate = (inputStr: string): string => {
    const date = dayjs(inputStr)
    return date.format("DD/MM/YYYY HH:mm:ss")
  }

  const actionText = tx => {
    if (tx.isL1) {
      return `Deposit to ${tx.toName}`
    } else {
      return `Withdraw to ${tx.toName}`
    }
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <Typography>
          <span>{formatDate(tx.initiatedAt)}</span>
        </Typography>
      </TableCell>
      {/* <TableCell>
        <Typography>
          <span>{tx.finalisedAt}</span>
        </Typography>
      </TableCell> */}
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>{actionText(tx)}</Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>
      {/* <TableCell>
        <Stack direction="column" spacing="1.4rem"></Stack>
      </TableCell> */}
      <TableCell sx={{ width: "18rem" }}>
        <Stack direction="column">
          <Typography>{tx.fromName}: </Typography>
          <Link external href={generateExploreLink(tx.fromExplore, tx.hash)} className="leading-normal flex-1">
            {truncateHash(tx.hash)}
          </Link>

          {!tx.fromBlockNumber && !tx.assumedStatus && <LinearProgress />}
          {renderEstimatedWaitingTime(estimatedTimeMap[`from_${tx.hash}`], tx.isL1, false)}
        </Stack>

        <Stack direction="column" className="mt-[1.2rem]">
          <Typography>{tx.toName}: </Typography>
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
