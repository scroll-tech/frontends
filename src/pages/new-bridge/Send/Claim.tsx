import { useEffect } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ClaimTable from "@/pages/new-bridge/components/ClaimTable"
import useClaimStore from "@/stores/claimStore"

const TableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "20rem",
}))

const Claim = (props: any) => {
  const { walletCurrentAddress } = useRainbowContext()
  const {
    claim: { refreshPageTransactions },
  } = useApp()

  const { page, total, pageTransactions, loading, targetTransaction, setTargetTransaction, orderedTxDB } = useClaimStore()

  useEffect(() => {
    if (targetTransaction) {
      const index = orderedTxDB.findIndex(tx => tx.hash === targetTransaction)
      const page = Math.ceil((index + 1) / BRIDGE_PAGE_SIZE)
      handleChangePage(page)
      setTargetTransaction(null)
    } else {
      handleChangePage(1)
    }
  }, [walletCurrentAddress])

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <TableBox>
      {pageTransactions?.length && walletCurrentAddress ? (
        <ClaimTable
          data={pageTransactions}
          loading={loading}
          pagination={{
            count: Math.ceil(total / BRIDGE_PAGE_SIZE),
            page,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ color: "#C58D49" }}>
          Your claimable transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default Claim
