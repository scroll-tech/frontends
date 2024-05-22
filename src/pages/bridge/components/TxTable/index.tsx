import { useMemo } from "react"
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
import useTokenInfo from "@/hooks/useTokenInfo"
import useTxStore from "@/stores/txStore"
import { formatDate, generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import NoData from "../NoData"
import TxStatusButton from "./TxStatusButton"

const useStyles = makeStyles<any>()((theme, { type }) => {
  return {
    tableContainer: {
      whiteSpace: "nowrap",
      minHeight: "30rem",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "1.6rem",
      },
    },
    tableWrapper: {
      boxShadow: "unset",
      borderRadius: "20px",
      background: "transparent",
    },
    tableMinHeight: {
      minHeight: type === "claim" ? "40rem" : "20rem",
      overflowX: "auto",
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
        padding: type === "claim" ? "1.6rem 0.8rem" : "2rem 1.6rem",
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
      overflowX: "auto",

      ".MuiPagination-ul": {
        flexWrap: "nowrap",
      },
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
  const { data, loading, pagination, type } = props
  const { classes } = useStyles({ type })

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        {data.length ? (
          <>
            <Box className={classes.tableMinHeight}>
              <Table aria-label="Tx Table">
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Amount</TableCell>
                    {type !== "claim" && <TableCell>Action</TableCell>}
                    <TableCell align="left">Initiated At</TableCell>
                    <TableCell sx={{ width: "32rem" }}>Transaction Hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  <>
                    {data.map((tx: any) => (
                      <TxRow key={tx.hash} tx={tx} type={type} />
                    ))}
                  </>
                </TableBody>
              </Table>
            </Box>

            {pagination && (
              <div className={`flex justify-center mt-[${type === "claim" ? "1.4rem" : "2rem"}]`}>
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
        ) : (
          <NoData
            sx={{ height: ["20rem", "30rem"] }}
            title="No transaction history"
            description="When you bridge assets, your transactions will appear here"
          ></NoData>
        )}
        {loading && (
          <Box className={classes.loadingBox}>
            <CircularProgress className={classes.loadingIndicator} />
          </Box>
        )}
      </TableContainer>
    </>
  )
}

const TxRow = props => {
  const { tx, type } = props

  const { estimatedTimeMap } = useTxStore()

  const toTip = useMemo(() => {
    if ([TX_STATUS.Dropped, TX_STATUS.FailedRelayed, TX_STATUS.SentFailed, TX_STATUS.Skipped, TX_STATUS.BatchDepositFailed].includes(tx.txStatus)) {
      return "-"
    }

    if (!tx.isL1) {
      if (estimatedTimeMap[`progress_${tx.hash}`] > Date.now()) {
        return "Claiming in progress..."
      }

      if (tx.txStatus === TX_STATUS.Sent && tx.claimInfo?.claimable) {
        return "Ready to be claimed"
      }
    }

    return "Pending..."
  }, [tx, estimatedTimeMap])

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, tx.isL1)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const actionText = tx => {
    if (tx.isL1) {
      return (
        <>
          Deposit <span style={{ whiteSpace: "nowrap" }}>to Scroll</span>
        </>
      )
    } else {
      return (
        <>
          Withdraw <span style={{ whiteSpace: "nowrap" }}>to Ethereum</span>
        </>
      )
    }
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          <TxStatusButton tx={tx} />
        </Stack>
      </TableCell>

      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>

      {type !== "claim" && (
        <TableCell>
          <Typography sx={{ fontWeight: 500 }}>{actionText(tx)}</Typography>
        </TableCell>
      )}

      <TableCell>
        <Typography sx={{ minWidth: "9rem" }}>{tx.initiatedAt ? formatDate(tx.initiatedAt, { withTime: true, isUnix: true }) : "-"}</Typography>
      </TableCell>

      <TableCell sx={{ width: "21rem" }}>
        <Stack direction="column">
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {tx.isL1 ? "Ethereum" : "Scroll"}:{" "}
            <Link
              external
              sx={{ color: "#0F8E7E" }}
              underline="always"
              href={generateExploreLink(NETWORKS[+!tx.isL1].explorer, tx.hash)}
              className="leading-normal flex-1"
            >
              {truncateHash(tx.replayTxHash || tx.hash)}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="column">
          <Typography sx={{ whiteSpace: "nowrap" }}>
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
