import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Stack, Tab } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import Claim from "./Claim"
import SendTransaction from "./SendTransaction"
import TxFailure from "./TxFailure"
import TxSuccess from "./TxSuccess"

const useStyles = makeStyles()(theme => ({
  tabList: {
    minHeight: "unset",
  },
  tabFlex: {
    width: "100%",
    gap: "4rem",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "2rem",
    },
  },
  tab: {
    minHeight: "unset",
    height: "3.4rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    textTransform: "unset",
    color: theme.palette.text.primary,
    padding: 0,

    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  indicator: {
    height: "3px",
    backgroundColor: theme.palette.text.primary,
  },
  tabPanel: {
    backgroundColor: theme.palette.themeBackground.optionHightlight,
    flex: 1,
    padding: "1.6rem 0 0",
  },
}))

const Withdraw = () => {
  const { classes } = useStyles()
  const { withDrawStep, changeWithdrawStep, txResult, txError } = useBridgeStore()

  const handleChange = (e, newValue) => {
    changeWithdrawStep(newValue)
  }

  if (txResult) {
    return <TxSuccess></TxSuccess>
  } else if (txError) {
    return <TxFailure></TxFailure>
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <TabContext value={withDrawStep}>
        <TabList
          onChange={handleChange}
          textColor="primary"
          classes={{ root: classes.tabList, flexContainer: classes.tabFlex, indicator: classes.indicator }}
        >
          <Tab label="Step 1: Withdraw from Scroll" value="1" classes={{ root: classes.tab }}></Tab>
          <Tab label="Step 2: Claim on Ethereum" value="2" classes={{ root: classes.tab }}></Tab>
        </TabList>
        <TabPanel value="1" classes={{ root: classes.tabPanel }}>
          <SendTransaction></SendTransaction>
        </TabPanel>
        <TabPanel value="2" classes={{ root: classes.tabPanel }}>
          <Claim></Claim>
        </TabPanel>
      </TabContext>
    </Stack>
  )
}

export default Withdraw
