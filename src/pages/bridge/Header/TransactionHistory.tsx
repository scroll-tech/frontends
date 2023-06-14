import { Box, Typography } from "@mui/material"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useTxStore from "@/stores/txStore"

import TxTable from "../components/TxTable"

const TransactionsList = (props: any) => {
  const {
    txHistory: { refreshPageTransactions },
  } = useApp()

  const { page, total, pageTransactions } = useTxStore()

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <Box sx={{ pt: ["2.4rem", "3rem"] }}>
      {pageTransactions.length ? (
        <TxTable
          data={pageTransactions}
          pagination={{
            count: Math.ceil(total / BRIDGE_PAGE_SIZE),
            page,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ width: "40rem" }}>
          Your transactions will appear here...
        </Typography>
      )}
    </Box>
  )
}

export default TransactionsList
