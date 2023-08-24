import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import useTxStore from "@/stores/txStore"

import TxTable from "../components/TxTable"

const TableBox = styled(Box)(({ theme }) => ({
  minHeight: "20rem",
  borderRadius: "40px",
  backgroundColor: theme.palette.themeBackground.optionHightlight,
  width: "100%",
}))

const TransactionsList = (props: any) => {
  const {
    txHistory: { refreshPageTransactions },
  } = useApp()

  const { page, total, pageTransactions } = useTxStore()

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <TableBox>
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
        <Typography variant="body1" color="textSecondary" sx={{ padding: "2rem" }}>
          Your transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default TransactionsList
