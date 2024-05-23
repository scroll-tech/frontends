import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { CLAIM_TABLE_PAGE_SIZE } from "@/constants"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useClaimStore from "@/stores/claimStore"

import NotConnected from "../components/NoConnected"
import TxTable from "../components/TxTable"

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
  const { walletCurrentAddress } = useRainbowContext()
  const {
    claimHistory: { refreshPageTransactions },
  } = useBridgeContext()

  const { page, total, pageTransactions, loading, clearTransactions } = useClaimStore()

  useEffect(() => {
    handleChangePage(1)
  }, [walletCurrentAddress])

  useEffect(() => {
    return () => {
      clearTransactions()
    }
  }, [])

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <Box className={classes.tableBox}>
      {walletCurrentAddress ? (
        <TxTable
          data={pageTransactions}
          loading={loading}
          type="claim"
          pagination={{
            count: Math.ceil(total / CLAIM_TABLE_PAGE_SIZE),
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
