import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"

import { CHAIN_ID, NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"

import Deposit from "./Deposit"
import Withdraw from "./Withdraw"

const useStyles = makeStyles()(theme => ({
  sendWrapper: {
    borderRadius: "2rem",
    overflow: "hidden",
  },
  tabList: {},
  tab: {
    height: "5.6rem",
    width: "31.4rem",
    fontSize: "2rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.themeBackground.normal,
    "&.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: 600,
      backgroundColor: theme.palette.themeBackground.highlight,
    },
  },
  indicator: {
    display: "none",
  },
  tabPanel: {
    backgroundColor: theme.palette.themeBackground.highlight,
    height: "36.6rem",
    padding: "3rem 5.4rem",
  },
}))

const Send = () => {
  const { classes } = useStyles()
  const { chainId } = useRainbowContext()
  const { txType, changeTxType, changeFromNetwork, changeToNetwork } = useBridgeStore()

  useEffect(() => {
    if (chainId && Object.values(CHAIN_ID).includes(chainId)) {
      const fromNetworkIndex = NETWORKS.findIndex(item => item.chainId === chainId)
      changeFromNetwork(NETWORKS[fromNetworkIndex])
      changeToNetwork(NETWORKS[+!fromNetworkIndex])
    } else {
      changeFromNetwork(NETWORKS[0])
      changeToNetwork(NETWORKS[1])
    }
  }, [chainId])

  const handleChange = (e, newValue) => {
    changeTxType(newValue)
  }

  return (
    <Box sx={{ width: "62.8rem" }} className={classes.sendWrapper}>
      <TabContext value={txType}>
        <TabList onChange={handleChange} TabIndicatorProps={{}} textColor="primary" classes={{ root: classes.tabList, indicator: classes.indicator }}>
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
