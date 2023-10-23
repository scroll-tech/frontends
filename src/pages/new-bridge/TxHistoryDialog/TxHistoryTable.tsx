import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"

import TxTable from "../components/TxTable"

const TableBox = styled(Box)(({ theme }) => ({
  borderRadius: "2rem",
  padding: "0 3rem 3rem",
  "& *": {
    fontFamily: "var(--developer-page-font-family) !important",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 2rem 2rem",
  },
}))

const TransactionsList = (props: any) => {
  const {
    txHistory: { refreshPageTransactions },
  } = useApp()
  const { chainId } = useRainbowContext()

  const { page, total, pageTransactions, loading } = useTxStore()

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  // TODO: may need an image for emply list
  return (
    <TableBox>
      {pageTransactions.length && chainId ? (
        <TxTable
          data={pageTransactions}
          loading={loading}
          pagination={{
            count: Math.ceil(total / BRIDGE_PAGE_SIZE),
            page,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ height: "20rem", lineHeight: "20rem", color: "#C58D49" }} align="center">
          Your transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default TransactionsList
