import { makeStyles } from "tss-react/mui"

import { CircularProgress, Stack, Typography } from "@mui/material"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useNFTTxStore from "@/stores/nftTxStore"

import TxTable from "../components/TxTable"

const useStyles = makeStyles()(theme => {
  return {
    tableWrapper: {
      boxShadow: "unset",
      border: `1px solid ${theme.palette.border.main}`,
      borderRadius: "1rem",
      [theme.breakpoints.down("sm")]: {
        border: "unset",
        borderRadius: "unset",
        margin: "0 -2rem",
        width: "calc(100% + 4rem)",
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
      backgroundColor: theme.palette.scaleBackground.primary,
    },
  }
})

const TransactionsList = (props: any) => {
  const { classes, cx } = useStyles()

  const {
    txHistory: { refreshPageTransactions },
  } = useApp()

  const { page, total, loading, frontTransactions } = useNFTTxStore()

  // TODO: waiting for api
  if (!frontTransactions?.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        Your transactions will appear here...
      </Typography>
    )
  }

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <>
      <div className={cx("flex", "items-center", "justify-between", classes.tableTitle)}>
        <Stack direction="row" spacing="2rem">
          <Typography variant="h6" color="textSecondary">
            Recent Bridge Transactions
          </Typography>
          {loading && <CircularProgress size={24} />}
        </Stack>
      </div>
      <TxTable
        data={frontTransactions.slice(0, 3)}
        pagination={{
          count: Math.ceil((total + frontTransactions.length) / BRIDGE_PAGE_SIZE),
          page,
          onChange: handleChangePage,
        }}
      />
    </>
  )
}

export default TransactionsList
