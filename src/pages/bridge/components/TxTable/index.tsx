import { useCallback, useMemo } from "react"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import {
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
  Typography,
} from "@mui/material"

import Link from "@/components/Link"
import { useApp } from "@/contexts/AppContextProvider"
import useTokenInfo from "@/hooks/useTokenInfo"
import { toTokenDisplay } from "@/utils"
import { generateExploreLink, truncateHash } from "@/utils"

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
      borderRadius: "1rem",
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
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
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

  const {
    txHistory: { blockNumbers },
  } = useApp()

  const { classes, cx } = useStyles()

  const txStatus = useCallback(
    (blockNumber, isL1, to) => {
      if (!blockNumber || !blockNumbers) {
        return "Pending"
      }
      if (blockNumbers[+!(isL1 ^ to)] >= blockNumber) {
        return "Success"
      }
      return "Pending"
    },
    [blockNumbers],
  )

  const fromStatus = useMemo(() => {
    return txStatus(tx.fromBlockNumber, tx.isL1, false)
  }, [tx, txStatus])

  const toStatus = useMemo(() => {
    return txStatus(tx.toBlockNumber, tx.isL1, true)
  }, [tx, txStatus])

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, tx.isL1)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals)
  }

  const renderCountDown = ({ hours, minutes, seconds, completed }) => {
    if (fromStatus === "Success") {
      return null
    } else if (completed) {
      return <LinearProgress />
    }
    return (
      <span>
        estimated waiting time: {hours}h{minutes}m{seconds}s
      </span>
    )
  }
  return (
    <TableRow key={tx.hash}>
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
      <TableCell className="w-full">
        <Typography>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="column">
          <Typography>From {tx.fromName}: </Typography>
          <Link external href={generateExploreLink(tx.fromExplore, tx.hash)} className="leading-normal flex-1">
            {truncateHash(tx.hash)}
          </Link>
          {!tx.fromBlockNumber && tx.isL1 && <LinearProgress />}
          {tx.fromEstimatedEndTime && (
            <Typography variant="body2" color="textSecondary">
              <Countdown date={tx.fromEstimatedEndTime} renderer={renderCountDown}></Countdown>
            </Typography>
          )}
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
          {tx.toEstimatedEndTime && (
            <Typography variant="body2" color="textSecondary">
              <Countdown date={tx.toEstimatedEndTime} renderer={renderCountDown}></Countdown>
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TxTable
