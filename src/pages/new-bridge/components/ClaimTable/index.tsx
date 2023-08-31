import dayjs from "dayjs"
import { useMemo } from "react"
import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import {
  Box,
  CircularProgress,
  LinearProgress,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

import Link from "@/components/Link"
import { EXPLORER_URL } from "@/constants"
import { useLastBlockNums } from "@/hooks/useRollupInfo"
import useTokenInfo from "@/hooks/useTokenInfo"
import { ClaimStatus } from "@/stores/claimStore"
import useTxStore from "@/stores/txStore"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import ClaimButton from "./ClaimButton"

const useStyles = makeStyles()(theme => {
  return {
    tableContainer: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        overflowX: "scroll",
      },
    },
    tableWrapper: {
      boxShadow: "unset",
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      borderRadius: 0,
      [theme.breakpoints.down("sm")]: {
        minWidth: "50rem",
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
        padding: "0.8rem",
        color: theme.palette.text.primary,
        "&:first-of-type": {
          paddingLeft: 0,
        },
      },
    },
    tableBody: {
      minHeight: "18.3rem",
      ".MuiTableCell-root": {
        verticalAlign: "top",
        padding: "2rem 0.8rem",
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
    pagination: {
      ".MuiPaginationItem-text": {
        fontSize: "1.6rem",
      },
      ".MuiPaginationItem-root": {},
      ".MuiPaginationItem-root.Mui-selected": {
        fontWeight: 700,
        backgroundColor: "unset",
      },
      ".MuiSvgIcon-root": {
        fontSize: "2.4rem",
      },
    },
    loadingBox: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(255,255,255,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loadingIndicator: {
      color: "#EB7106",
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
    <Box className={classes.tableContainer}>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table" sx={{ minHeight: "20rem" }}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="center">Claim</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell sx={{ width: "18rem" }}>Transaction Hash</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            <>
              {data?.map((tx: any) => (
                <TxRow key={tx.hash} tx={tx} finalizedIndex={lastBlockNums?.finalized_index ?? 0} />
              ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <div className="flex justify-center mt-[2.8rem]">
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
      {loading ? (
        <Box className={classes.loadingBox}>
          <CircularProgress className={classes.loadingIndicator} />
        </Box>
      ) : null}
    </Box>
  )
}

const TxRow = props => {
  const { tx, finalizedIndex } = props
  const { estimatedTimeMap } = useTxStore()

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, true)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const txStatus = useMemo(() => {
    const { assumedStatus, toBlockNumber, claimInfo } = tx
    if (assumedStatus) {
      return ClaimStatus.FAILED
    }
    if (toBlockNumber) {
      return ClaimStatus.CLAIMED
    }
    if (estimatedTimeMap[`claim_${tx.hash}`]) {
      return ClaimStatus.CLAIMING
    }
    if (+claimInfo?.batch_index && claimInfo?.batch_index <= finalizedIndex) {
      return ClaimStatus.CLAIMABLE
    }
    return ClaimStatus.NOT_READY
  }, [tx, finalizedIndex, estimatedTimeMap[`claim_${tx.hash}`]])

  const initiatedAt = useMemo(() => {
    const date = dayjs(tx.initiatedAt)
    return tx.initiatedAt ? date.format("MM/YY HH:mm:ss") : "-"
  }, [tx])

  const txStatusCopy = () => {
    return (
      <>
        <Typography sx={{ fontWeight: 600 }}>
          {txStatus === ClaimStatus.CLAIMED ? "Claimed" : null}
          {txStatus === ClaimStatus.CLAIMING ? "Claiming... " : null}
          {txStatus === ClaimStatus.CLAIMABLE ? "Ready to be Claimed" : null}
          {txStatus === ClaimStatus.NOT_READY ? "Not yet finalised" : null}
        </Typography>

        {renderEstimatedWaitingTime(estimatedTimeMap[`to_${tx.toHash}`])}
        <Typography sx={{ fontWeight: 400, whiteSpace: "nowrap" }}>Transaction sent: {initiatedAt}</Typography>
      </>
    )
  }

  const renderEstimatedWaitingTime = timestamp => {
    if (txStatus === ClaimStatus.CLAIMED) {
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

  const renderCountDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <LinearProgress />
    }
    return (
      <span>
        Ready in {minutes}m {seconds}s (estimate)
      </span>
    )
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <ClaimButton tx={tx} txStatus={txStatus} />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>
          Scroll:{" "}
          <Link sx={{ color: "#396CE8" }} external href={generateExploreLink(EXPLORER_URL.L2, tx.hash)} className="leading-normal flex-1">
            {truncateHash(tx.hash)}
          </Link>
        </Typography>
        {tx.toHash ? (
          <Typography>
            Ethereum:{" "}
            <Link sx={{ color: "#396CE8" }} external href={generateExploreLink(EXPLORER_URL.L1, tx.toHash)} className="leading-normal flex-1">
              {truncateHash(tx.toHash)}
            </Link>
          </Typography>
        ) : null}
      </TableCell>
      <TableCell>{txStatusCopy()}</TableCell>
    </TableRow>
  )
}

export default TxTable
