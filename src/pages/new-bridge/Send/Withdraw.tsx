import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Stack, Tab } from "@mui/material"

import useBridgeStore from "@/stores/bridgeStore"

import Claim from "./Claim"
import SendTransaction from "./SendTransaction"

const useStyles = makeStyles()(theme => ({
  tabList: {
    minHeight: "unset",
  },
  tabFlex: {
    width: "100%",
    justifyContent: "center",
    borderBottom: "1px solid #5b5b5b",
    margin: "0 auto",
  },
  tab: {
    minHeight: "unset",
    height: "4.4rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    textTransform: "unset",
    color: theme.palette.text.primary,
    padding: 0,
    flex: 1,
    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      padding: "0 1rem",
      width: "unset",
    },
  },
  indicator: {
    height: "4px",
    backgroundColor: "#FF684B",
  },
  tabPanel: {
    backgroundColor: theme.palette.themeBackground.optionHightlight,
    flex: 1,
    padding: "1.6rem 0 0",
  },
}))

const Withdraw = () => {
  const { classes } = useStyles()
  const { withDrawStep, changeWithdrawStep } = useBridgeStore()

  const handleChange = (e, newValue) => {
    changeWithdrawStep(newValue)
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <TabContext value={withDrawStep}>
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
