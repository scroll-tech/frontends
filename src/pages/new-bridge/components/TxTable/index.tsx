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
  Tooltip,
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
      width: "68.8rem",
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
              <TableCell sx={{ width: "12rem" }}>Action</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
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
  const { classes, cx } = useStyles()

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

  const renderStatus = () => {
    if (toStatus === TX_STATUS.success) {
      return <button className={cx(classes.chip, classes.successChip)}>{TX_STATUS.success}</button>
    }
    if (tx.assumedStatus) {
      return (
        <Tooltip placement="top" title={tx.errMsg || tx.assumedStatus}>
          <button className={cx(classes.chip, classes.failedChip)}>
            Failed
            <svg style={{ marginLeft: "4px" }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 12.75C10.175 12.75 12.75 10.175 12.75 7C12.75 3.825 10.175 1.25 7 1.25C3.825 1.25 1.25 3.825 1.25 7C1.25 10.175 3.825 12.75 7 12.75ZM7 14C10.865 14 14 10.865 14 7C14 3.135 10.865 0 7 0C3.135 0 0 3.135 0 7C0 10.865 3.135 14 7 14Z"
                fill="#FFF8F3"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 5.56C7.345 5.56 7.625 5.84 7.625 6.185V10.185C7.625 10.53 7.345 10.81 7 10.81C6.655 10.81 6.375 10.53 6.375 10.185V6.185C6.375 5.84 6.655 5.56 7 5.56Z"
                fill="#FFF8F3"
              />
              <path
                d="M7 4.435C7.34518 4.435 7.625 4.15518 7.625 3.81C7.625 3.46482 7.34518 3.185 7 3.185C6.65482 3.185 6.375 3.46482 6.375 3.81C6.375 4.15518 6.65482 4.435 7 4.435Z"
                fill="#FFF8F3"
              />
            </svg>
          </button>
        </Tooltip>
      )
    }
    return (
      <button className={cx(classes.chip, classes.pendingChip)}>
        Pending <CircularProgress size={12} sx={{ marginLeft: "0.2rem" }} color="inherit" />
      </button>
    )
  }

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
        <Typography>
          <span>{formatDate(tx.initiatedAt)}</span>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>{actionText(tx)}</Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          {" "}
          {renderStatus()}
        </Stack>
      </TableCell>
      <TableCell sx={{ width: "21rem" }}>
        <Stack direction="column">
          <Typography>
            {tx.isL1 ? "Ethereum" : "Scroll"}:{" "}
            <Link external href={generateExploreLink(tx.fromExplore, tx.hash)} className="leading-normal flex-1">
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
              <Link external href={generateExploreLink(tx.toExplore, tx.toHash)} className="leading-normal flex-1">
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
