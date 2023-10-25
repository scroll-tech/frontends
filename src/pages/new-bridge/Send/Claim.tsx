import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, CircularProgress, Typography } from "@mui/material"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ClaimTable from "@/pages/new-bridge/components/ClaimTable"
import useBridgeStore from "@/stores/bridgeStore"
import useClaimStore from "@/stores/claimStore"

const useStyles = makeStyles()(theme => ({
  tableBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "34.3rem",
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
}))

const Claim = (props: any) => {
  const { classes } = useStyles()
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const {
    claim: { refreshPageTransactions },
  } = useBrigeContext()

  const { page, total, pageTransactions, loading, targetTransaction, orderedTxDB, setTargetTransaction, clearTransactions } = useClaimStore()
  const { historyVisible } = useBridgeStore()

  useEffect(() => {
    handleChangePage(1)
  }, [walletCurrentAddress])

  useEffect(() => {
    return () => {
      clearTransactions()
    }
  }, [])

  useEffect(() => {
    // if targetTransaction has value, then we need to move to the target transaction
    if (targetTransaction) {
      const index = orderedTxDB.findIndex(tx => tx.hash === targetTransaction)
      const page = Math.ceil((index + 1) / BRIDGE_PAGE_SIZE)
      handleChangePage(page)
      setTargetTransaction(null)
    }
  }, [historyVisible])

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <Box className={classes.tableBox}>
      {pageTransactions?.length && chainId ? (
        <ClaimTable
          data={pageTransactions}
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
      {loading ? (
        <Box className={classes.loadingBox}>
          <CircularProgress className={classes.loadingIndicator} />
        </Box>
      ) : null}
    </Box>
  )
}

export default Claim
