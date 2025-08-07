import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Stack, Tab } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import Claim from "./Claim"
import SendTransaction from "./SendTransaction"

const useStyles = makeStyles()(theme => ({
  tabList: {
    minHeight: "unset",
    marginBottom: "1.6rem",
  },
  tabFlex: {
    width: "100%",
    justifyContent: "flex-start",
    margin: "0 auto",
    gap: "0.8rem",
  },
  tab: {
    minHeight: "unset",
    height: "4.4rem",
    fontSize: "1.6rem",
    fontWeight: 500,
    textTransform: "unset",
    color: theme.vars.palette.text.primary,
    padding: 0,
    width: "16rem",
    backgroundColor: "white",
    borderRadius: "0.8rem",
    "&.Mui-selected": {
      backgroundColor: theme.vars.palette.text.primary,
      color: "white",
      fontWeight: 700,
    },
    [theme.breakpoints.down("sm")]: {
      height: "4rem",
      fontSize: "1.6rem",
      padding: "0 1rem",
      width: "unset",
      flex: 1,
    },
  },
  indicator: {
    display: "none",
  },
  tabPanel: {
    flex: 1,
    padding: "0",
  },
}))

const Withdraw = () => {
  const { classes } = useStyles()
  const { withdrawStep, changeWithdrawStep } = useBridgeStore()

  const handleChange = (e, newValue) => {
    changeWithdrawStep(newValue)
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <TabContext value={withdrawStep}>
        <TabList
          onChange={handleChange}
          textColor="primary"
          classes={{ root: classes.tabList, flexContainer: classes.tabFlex, indicator: classes.indicator }}
        >
          <Tab label="Step 1: Withdraw" value="1" classes={{ root: classes.tab }}></Tab>
          <Tab label="Step 2: Claim" value="2" classes={{ root: classes.tab }}></Tab>
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
