import { Box } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore from "@/stores/txStore"

import NoConnected from "../components/NoConnected"
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
  } = useBridgeContext()
  const { walletCurrentAddress } = useRainbowContext()

  const { page, total, pageTransactions, loading } = useTxStore()

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <TableBox>
      {walletCurrentAddress ? (
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
        <NoConnected sx={{ height: ["20rem", "30rem"] }} description="Connect wallet to see your transaction history"></NoConnected>
      )}
    </TableBox>
  )
}

export default TransactionsList
