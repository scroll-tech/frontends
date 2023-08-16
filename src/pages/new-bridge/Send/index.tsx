import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

// import { switchNetwork } from "@/utils"
import Deposit from "./Deposit"
import Withdraw from "./Withdraw"

const useStyles = makeStyles()(theme => ({
  sendWrapper: {
    borderRadius: "2rem",
    overflow: "hidden",
    maxWidth: "64rem",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  tabList: {},
  tab: {
    height: "5.6rem",
    width: "32rem",
    fontSize: "2rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    padding: 0,
    backgroundColor: theme.palette.themeBackground.normal,
    textTransform: "unset",
    "&.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
      backgroundColor: theme.palette.themeBackground.optionHightlight,
    },

    [theme.breakpoints.down("sm")]: {
      width: "50%",
      fontSize: "1.6rem",
    },
  },
  indicator: {
    display: "none",
  },
  tabPanel: {
    backgroundColor: theme.palette.themeBackground.optionHightlight,
    padding: "3rem 5.4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 2rem 2rem",
    },
  },
}))

const Send = () => {
  const { classes } = useStyles()
  const { chainId } = useRainbowContext()
  const { txType, fromNetwork, toNetwork, withDrawStep, changeTxType, changeFromNetwork, changeToNetwork, changeIsNetworkCorrect } = useBridgeStore()

  useEffect(() => {
    let networkCorrect
    if (txType === "Deposit") {
      networkCorrect = fromNetwork.isL1 && chainId === CHAIN_ID.L1
    } else if (withDrawStep === "1") {
      networkCorrect = !fromNetwork.isL1 && chainId === CHAIN_ID.L2
    } else {
      networkCorrect = chainId === CHAIN_ID.L1
    }
    changeIsNetworkCorrect(networkCorrect)
  }, [fromNetwork, txType, withDrawStep, chainId])

  const handleChange = (e, newValue) => {
    changeTxType(newValue)
    changeFromNetwork(toNetwork)
    changeToNetwork(fromNetwork)
  }

  return (
    <Box className={classes.sendWrapper}>
      <TabContext value={txType}>
        <TabList onChange={handleChange} textColor="primary" classes={{ root: classes.tabList, indicator: classes.indicator }}>
          <Tab label="Deposit to Scroll" value="Deposit" classes={{ root: classes.tab }}></Tab>
          <Tab label="Withdraw to Ethereum" value="Withdraw" classes={{ root: classes.tab }}></Tab>
        </TabList>
        <TabPanel value="Deposit" classes={{ root: classes.tabPanel }}>
          <Deposit></Deposit>
        </TabPanel>
        <TabPanel value="Withdraw" classes={{ root: classes.tabPanel }}>
          <Withdraw></Withdraw>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Send
