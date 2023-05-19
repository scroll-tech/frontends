import { makeStyles } from "tss-react/mui"

import { CircularProgress, Stack, Typography } from "@mui/material"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useTxStore from "@/stores/txStore"

import TxTable from "../components/TxTable"

const useStyles = makeStyles()(theme => {
  return {
    tableTitle: {
      marginTop: "2.8rem",
      marginBottom: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.6rem",
        marginBottom: "1.6rem",
      },
    },
  }
})

const TransactionsList = (props: any) => {
  const { classes, cx } = useStyles()

  const {
    txHistory: { refreshPageTransactions },
  } = useApp()

  const { page, total, loading, frontTransactions, pageTransactions } = useTxStore()

  if (!pageTransactions?.length) {
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
        data={pageTransactions}
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
