import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Snackbar, Tab } from "@mui/material"

import Alert from "@/components/Alert"
import TextButton from "@/components/TextButton"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

import Deposit from "./Deposit"
import Withdraw from "./Withdraw"

const useStyles = makeStyles()(theme => ({
  sendWrapper: {
    borderRadius: "2rem",
    overflow: "hidden",
    maxWidth: "66rem",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  tabList: {
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      borderBottom: "0.5px solid rgba(16, 16, 16, 0.20)",
    },
  },
  tab: {
    flex: 1,
    height: "5.6rem",
    fontSize: "1.8rem",
    fontWeight: 500,
    color: (theme as any).vars.palette.text.primary,
    padding: 0,
    backgroundColor: "#FFE6C8",
    textTransform: "unset",
    "&.Mui-selected": {
      fontWeight: 600,
      color: "#FF684B",
      backgroundColor: (theme as any).vars.palette.themeBackground.normal,
    },

    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
      width: "50%",
      fontSize: "1.6rem",
      backgroundColor: (theme as any).vars.palette.themeBackground.normal,
    },
  },
  indicator: {
    height: "0",
    backgroundColor: "#FF684B",
    [theme.breakpoints.down("sm")]: {
      height: "4px",
    },
  },
  tabPanel: {
    padding: "2.4rem 3.2rem",
    backgroundColor: (theme as any).vars.palette.themeBackground.normal,
    borderRadius: "2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.6rem 0",
    },
  },

  snackbar: {
    width: "max-content",
    maxWidth: "calc(100% - 1.6rem)",

    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
}))

const OfficialBridge = () => {
  const { classes, cx } = useStyles()
  const { chainId } = useRainbowContext()
  const { txType, txResult, fromNetwork, withdrawStep, changeTxType, changeTxResult, changeHistoryVisible, changeIsNetworkCorrect } = useBridgeStore()

  useEffect(() => {
    let networkCorrect
    if (txType === "Deposit") {
      networkCorrect = fromNetwork.isL1 && chainId === CHAIN_ID.L1
    } else if (withdrawStep === "1") {
      networkCorrect = !fromNetwork.isL1 && chainId === CHAIN_ID.L2
    } else {
      networkCorrect = chainId === CHAIN_ID.L1
    }
    changeIsNetworkCorrect(networkCorrect)
  }, [fromNetwork, txType, withdrawStep, chainId])

  const handleChange = (e, newValue) => {
    changeTxType(newValue)
    handleClose()
  }

  const handleOpenHistory = () => {
    changeHistoryVisible(true)
    handleClose()
  }

  const handleClose = () => {
    changeTxResult(null)
  }

  return (
    <Box className={classes.sendWrapper}>
      <TabContext value={txType}>
        <TabList
          onChange={handleChange}
          textColor="primary"
          classes={{ root: classes.tabList, fixed: classes.tabList, flexContainer: classes.tabList, indicator: classes.indicator }}
        >
          <Tab label="Deposit to Scroll" value="Deposit" classes={{ root: classes.tab }}></Tab>
          <Tab label="Withdraw to Ethereum" value="Withdraw" classes={{ root: classes.tab }}></Tab>
        </TabList>
        <TabPanel value="Deposit" classes={{ root: classes.tabPanel }}>
          <Deposit></Deposit>
        </TabPanel>
        <TabPanel value="Withdraw" className={withdrawStep === "2" ? "tx" : ""} classes={{ root: cx(classes.tabPanel, "withdraw") }}>
          <Withdraw></Withdraw>
        </TabPanel>
      </TabContext>

      <Snackbar
        open={!!txResult}
        autoHideDuration={6000}
        classes={{ root: classes.snackbar }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <div>
          {txResult?.code === 1 && (
            <Alert severity="success">
              <>
                Submitted successfully! <br />
                {txType === "Deposit" ? "Funds take up to 20 mins to be ready" : "Funds take up to 2h to be claimable"} <br />
                <TextButton underline="always" sx={{ color: "inherit" }} onClick={handleOpenHistory}>
                  View transaction history
                </TextButton>
              </>
            </Alert>
          )}
          {txResult?.code === 0 && (
            <Alert severity="error" sx={{ maxWidth: "49rem" }}>
              <>
                Failed in submission.
                <br /> {txResult?.message}
              </>
            </Alert>
          )}
        </div>
      </Snackbar>
    </Box>
  )
}

export default OfficialBridge
