import dayjs from "dayjs"
import { useCallback, useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import {
  Box,
  CircularProgress,
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
import { NETWORKS, TX_STATUS } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import useTokenInfo from "@/hooks/useTokenInfo"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import useCheckClaimStatus from "../../hooks/useCheckClaimStatus"
import useLastFinalizedBatchIndex from "../../hooks/useLastFinalizedBatchIndex"
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
    },
    tableMinHeight: {
      minHeight: "20rem",
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
        whiteSpace: "nowrap",
        "&:first-of-type": {
          paddingLeft: 0,
        },
      },
    },
    tableBody: {
      ".MuiTableCell-root": {
        padding: "2rem 1.6rem",
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
  const { lastFinalizedBatchIndex } = useLastFinalizedBatchIndex()

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Box className={classes.tableMinHeight}>
          <Table aria-label="Tx Table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell align="center">Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell sx={{ width: "16rem" }}>Action</TableCell>
                <TableCell sx={{ width: "12rem" }} align="left">
                  Initiated At
                </TableCell>
                <TableCell sx={{ width: "32rem" }}>Transaction Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              <>
                {data?.map((tx: any) => (
                  <TxRow finalizedIndex={lastFinalizedBatchIndex ?? 0} key={tx.hash} tx={tx} />
                ))}
              </>
            </TableBody>
          </Table>
        </Box>

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
        {loading ? (
          <Box className={classes.loadingBox}>
            <CircularProgress className={classes.loadingIndicator} />
          </Box>
        ) : null}
      </TableContainer>
    </>
  )
}

const TxRow = props => {
  const { tx, finalizedIndex } = props

  const { blockNumbers } = useBrigeContext()

  const txStatus = useCallback(
    (blockNumber, assumedStatus, isL1, to) => {
      if (assumedStatus && !to) {
        return assumedStatus
      }
      if (assumedStatus && to) {
        return TX_STATUS.empty
      }

      if (blockNumber && blockNumbers) {
        if (isL1) {
          if ((!to && blockNumbers[0] >= blockNumber) || (to && blockNumbers[1] >= blockNumber)) {
            return TX_STATUS.success
          }
        } else {
          if ((!to && blockNumbers[1] >= blockNumber) || to) {
            return TX_STATUS.success
          }
        }
      }
      return TX_STATUS.pending
    },
    [blockNumbers],
  )

  const { claimTip } = useCheckClaimStatus(tx)

  const toTip = useMemo(() => {
    if (tx.isL1) {
      return "Pending..."
    }
    return claimTip
  }, [tx, claimTip])

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
        <Typography>{formatDate(tx.initiatedAt)}</Typography>
      </TableCell>

      <TableCell sx={{ width: "21rem" }}>
        <Stack direction="column">
          <Typography>
            {tx.isL1 ? "Ethereum" : "Scroll"}:{" "}
            <Link
              external
              sx={{ color: "#0F8E7E" }}
              underline="always"
              href={generateExploreLink(NETWORKS[+!tx.isL1].explorer, tx.hash)}
              className="leading-normal flex-1"
            >
              {truncateHash(tx.hash)}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="column" className="mt-[0.4rem]">
          <Typography>
            {tx.isL1 ? "Scroll" : "Ethereum"}:{" "}
            {tx.toHash ? (
              <Link
                external
                sx={{ color: "#0F8E7E" }}
                underline="always"
                href={generateExploreLink(NETWORKS[+tx.isL1].explorer, tx.toHash)}
                className="leading-normal flex-1"
              >
                {truncateHash(tx.toHash)}
              </Link>
            ) : (
              <Typography component="span" sx={{ fontSize: "1.4rem", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                {toTip}
              </Typography>
            )}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default TxTable
