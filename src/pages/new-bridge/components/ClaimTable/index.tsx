import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import {
  CircularProgress,
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
  const { data, loading, pagination } = props
  const { classes } = useStyles()

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }
  const { lastBlockNums } = useLastBlockNums()

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
                  <TxRow key={tx.hash} tx={tx} lastFinalized={lastBlockNums?.finalized_index ?? 0} />
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
  const { tx, lastFinalized } = props

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.l1Token, true)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }

  const isFinalized = useMemo(() => {
    return lastFinalized > tx.claimInfo?.batch_index
  }, [lastFinalized])

  const txStatus = () => {
    if (isFinalized) {
      return <Typography sx={{ fontWeight: 600 }}>Ready to be Claimed </Typography>
    } else {
      return <Typography sx={{ fontWeight: 600 }}>Claim Pending...</Typography>
    }
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <ClaimButton tx={tx} isFinalized={isFinalized} />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Link external href={generateExploreLink(EXPLORER_URL.L2, tx.hash)} className="leading-normal flex-1">
          {truncateHash(tx.hash)}
        </Link>
      </TableCell>
      <TableCell>{txStatus()}</TableCell>
    </TableRow>
  )
}

export default TxTable
