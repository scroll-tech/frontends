import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"

import TxTable from "../components/TxTable"

const TableBox = styled(Box)(({ theme }) => ({
  minHeight: "26.8rem",
  borderRadius: "2rem",
  backgroundColor: theme.palette.themeBackground.optionHightlight,
  width: "100%",
  "& *": {
    fontFamily: "var(--developer-page-font-family) !important",
  },
}))

const TransactionsList = (props: any) => {
  const {
    txHistory: { refreshPageTransactions },
  } = useApp()
  const { walletCurrentAddress } = useRainbowContext()

  const { page, total, pageTransactions, loading } = useTxStore()

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <TableBox>
      {pageTransactions.length && walletCurrentAddress ? (
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
        <Typography variant="body1" color="textSecondary" sx={{ paddingTop: "2rem", color: "#C58D49" }} align="center">
          Your transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default TransactionsList
