import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { CLAIM_TABEL_PAGE_SIZE } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ClaimTable from "@/pages/bridge/components/ClaimTable"
import useBridgeStore from "@/stores/bridgeStore"
import useClaimStore from "@/stores/claimStore"

import NotConnected from "../components/NoConnected"

const useStyles = makeStyles()(theme => ({
  tableBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "44rem",
    [theme.breakpoints.down("sm")]: {
      height: "41.8rem",
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
      const page = Math.ceil((index + 1) / CLAIM_TABEL_PAGE_SIZE)
      handleChangePage(page)
      setTargetTransaction(null)
    }
  }, [historyVisible])

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <Box className={classes.tableBox}>
      {chainId ? (
        <ClaimTable
          data={pageTransactions}
          loading={loading}
          pagination={{
            count: Math.ceil(total / CLAIM_TABEL_PAGE_SIZE),
            page,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <NotConnected description="Connect wallet to see your claimable asset"></NotConnected>
      )}
    </Box>
  )
}

export default Claim
