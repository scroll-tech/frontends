import Countdown from "react-countdown"
import { makeStyles } from "tss-react/mui"

import {
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
import useTokenInfo from "@/hooks/useTokenInfo"
import useClaimStore, { ClaimStatus } from "@/stores/claimStore"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import ClaimButton from "./ClaimButton"

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
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      borderRadius: 0,
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
      height: "18.3rem",
      ".MuiTableCell-root": {
        verticalAlign: "top",
        padding: "2rem 2rem",
        "*": {
          fontSize: "1.4rem",
        },
        "&:first-of-type": {
          paddingLeft: 0,
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
              <TableCell align="left">Claim</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Transaction Hash</TableCell>
              <TableCell>Status</TableCell>
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
      </TableContainer>
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

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.l1Token, true)
  const { estimatedTimeMap } = useClaimStore()

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const txStatus = () => {
    if (tx.claimStatus === ClaimStatus.CLAIMED) {
      return (
        <>
          <Typography sx={{ fontWeight: 600 }}> Claimed </Typography>
          <Typography sx={{ fontWeight: 400 }}>
            Transaction sent: <br />
            {tx.initiatedAt}
          </Typography>
          <Typography sx={{ fontWeight: 400 }}>
            Finalised At:
            {tx.finalisedAt}
          </Typography>
        </>
      )
    } else if (tx.claimStatus === ClaimStatus.CLAIMING) {
      return (
        <>
          <Typography sx={{ fontWeight: 600 }}> Claiming... </Typography>
          <Typography sx={{ fontWeight: 400 }}>
            Transaction sent: <br />
            {tx.initiatedAt}
          </Typography>
        </>
      )
    } else if (tx.claimStatus === ClaimStatus.CLAIMABLE) {
      return (
        <>
          <Typography sx={{ fontWeight: 600 }}> Ready to be Claimed </Typography>
          <Typography sx={{ fontWeight: 400 }}>
            Transaction sent: <br />
            {tx.initiatedAt}
          </Typography>
        </>
      )
    }

    return (
      <>
        <Typography sx={{ fontWeight: 600 }}> Scroll provers are still finalizing your transaction</Typography>
        <Typography sx={{ fontWeight: 400 }}>
          Transaction sent: <br />
          {tx.initiatedAt}
        </Typography>
      </>
    )

    // if (tx.claimStatus === ClaimStatus.CLAIMED) {
    //   return <Typography sx={{ fontWeight: 600 }}> Claimed </Typography>
    // } else {
    //   return <Typography sx={{ fontWeight: 600 }}>Claim Pending...</Typography>
    // }
  }

  const renderEstimatedWaitingTime = timestamp => {
    if (tx.claimStatus === ClaimStatus.CLAIMED) {
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

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <ClaimButton tx={tx} />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Link external href={generateExploreLink(EXPLORER_URL.L2, tx.hash)} className="leading-normal flex-1">
          {truncateHash(tx.hash)}
        </Link>
        <br />
        {tx.toHash ? (
          <>
            <Link external href={generateExploreLink(EXPLORER_URL.L1, tx.toHash)} className="leading-normal flex-1">
              {truncateHash(tx.toHash)}
            </Link>
          </>
        ) : null}
        {renderEstimatedWaitingTime(estimatedTimeMap[`claim_${tx.hash}`])}
      </TableCell>
      <TableCell>{txStatus()}</TableCell>
    </TableRow>
  )
}

export default TxTable
