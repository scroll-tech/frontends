import dayjs from "dayjs"
import { useMemo, useState } from "react"
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
import { EXPLORER_URL } from "@/constants"
import useTokenInfo from "@/hooks/useTokenInfo"
import { ClaimStatus } from "@/stores/claimStore"
import { generateExploreLink, toTokenDisplay, truncateHash } from "@/utils"

import useCheckClaimStatus from "../../hooks/useCheckClaimStatus"
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
      minHeight: "28.7rem",
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

const ClaimTable = (props: any) => {
  const { data, loading, pagination } = props
  const { classes } = useStyles()

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage)
  }

  return (
    <Box className={classes.tableContainer}>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell align="center">Claim</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Initiated At</TableCell>
              <TableCell>Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            <>
              {data?.map((tx: any) => (
                <TxRow key={tx.hash} tx={tx} />
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
  const { tx } = props

  const { loading: tokenInfoLoading, tokenInfo } = useTokenInfo(tx.symbolToken, tx.isL1)
  const [loading, setLoading] = useState(false)

  const txAmount = amount => {
    return toTokenDisplay(amount, tokenInfo?.decimals ? BigInt(tokenInfo.decimals) : undefined)
  }
  const { claimStatus, claimTip } = useCheckClaimStatus(tx)

  const claimTipWithLoading = useMemo(() => {
    if (loading || claimStatus === ClaimStatus.CLAIMING) {
      return "Claiming in progress"
    }
    return claimTip
  }, [claimStatus, loading])

  const formatDate = (inputStr: string): string => {
    return inputStr ? dayjs(inputStr).format("DD/MM/YYYY HH:mm:ss") : "-"
  }

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <ClaimButton tx={tx} txStatus={claimStatus} loading={loading} changeLoading={setLoading} />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 500 }}>
          <span>{txAmount(tx.amount)} </span>
          {tokenInfoLoading ? <Skeleton variant="text" width="5rem" className="inline-block" /> : <span>{tokenInfo?.symbol}</span>}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatDate(tx.initiatedAt)}</Typography>
      </TableCell>
      <TableCell sx={{ width: "21rem" }}>
        <Stack direction="column">
          <Typography>
            Scroll:{" "}
            <Link
              external
              sx={{ color: "#0F8E7E" }}
              underline="always"
              href={generateExploreLink(EXPLORER_URL.L2, tx.hash)}
              className="leading-normal flex-1"
            >
              {truncateHash(tx.hash)}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="column" className="mt-[0.4rem]">
          <Typography>
            Ethereum:{" "}
            {tx.toHash ? (
              <Link
                external
                sx={{ color: "#0F8E7E" }}
                underline="always"
                href={generateExploreLink(EXPLORER_URL.L1, tx.toHash)}
                className="leading-normal flex-1"
              >
                {truncateHash(tx.toHash)}
              </Link>
            ) : (
              <span className="leading-normal flex-1">{claimTipWithLoading}</span>
            )}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default ClaimTable
