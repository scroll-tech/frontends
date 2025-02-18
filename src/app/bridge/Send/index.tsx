import { sendGAEvent } from "@next/third-parties/google"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { makeStyles } from "tss-react/mui"

import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, MenuItem, Select, Tab, useMediaQuery, useTheme } from "@mui/material"

import ArrowDownSvg from "@/assets/svgs/bridge/arrow-down.svg"
import { BRIDGE_TAB } from "@/constants/searchParamsKey"
import { isSepolia } from "@/utils"

import Buy from "./Buy"
import Exchanges from "./Exchanges"
import OfficialBridge from "./OfficialBridge"
import ThirdParty from "./ThirdParty"

const useStyles = makeStyles()(theme => ({
  sendWrapper: {
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
    borderBottom: "0.5px solid rgba(16, 16, 16, 0.20)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  tab: {
    width: "fit-content",
    minWidth: "fit-content",
    height: "5.6rem",
    fontSize: "1.8rem",
    fontWeight: 600,
    color: (theme as any).vars.palette.text.primary,
    padding: 0,
    textTransform: "unset",
    "&.Mui-selected": {
      color: "#FF684B",
    },

    [theme.breakpoints.down("sm")]: {
      width: "50%",
      fontSize: "1.4rem",
    },
  },
  indicator: {
    height: "4px",
    backgroundColor: "#FF684B",
  },
  tabPanel: {
    padding: "3.2rem",
    backgroundColor: theme.vars.palette.themeBackground.normal,
    borderRadius: "2rem",
    marginTop: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2.4rem 1.6rem",
    },
  },

  mobileSelect: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "white",
    border: "1px solid #473835",
    "& .MuiSelect-select": {
      fontSize: "1.6rem",
      padding: "1rem 1.6rem",
      height: "28px",
      display: "flex",
      alignItems: "center",
      fontWeight: 600,
      fontFamily: "var(--default-font-family) !important",
    },
    "& .MuiOutlinedInput-root": {
      height: "36px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-icon": {
      right: "1rem",
      top: "2rem",
    },
  },
}))

const Send = () => {
  const { classes } = useStyles()
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const tab = searchParams.get(BRIDGE_TAB)

  const [txType, setTxType] = useState(tab || "OfficialBridge")

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleChange = (e, newValue) => {
    setTxType(newValue)
    router.push(`${pathname}?${BRIDGE_TAB}=${newValue}`)
    sendGAEvent("event", "bridge_tab_change", {
      label: newValue,
    })
  }

  const options = [
    { value: "OfficialBridge", label: "From/to Ethereum" },
    { value: "ThirdParty", label: "From other chains" },
    { value: "Exchanges", label: "Exchanges" },
    { value: "Buy", label: "Buy with Fiat" },
  ]

  const handleSelectChange = event => {
    setTxType(event.target.value)
    router.push(`${pathname}?${BRIDGE_TAB}=${event.target.value}`)
    sendGAEvent("event", "bridge_tab_change", {
      label: event.target.value,
    })
  }

  return (
    <Box className={classes.sendWrapper}>
      <TabContext value={txType}>
        {isMobile && !isSepolia && (
          <Select
            value={txType}
            onChange={handleSelectChange}
            className={classes.mobileSelect}
            IconComponent={props => <ArrowDownSvg {...props} />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  borderRadius: "10px",
                  marginTop: "8px",
                },
              },
            }}
          >
            {options.map(option => (
              <MenuItem
                sx={{ fontSize: "1.6rem", fontWeight: 500, fontFamily: "var(--default-font-family) !important" }}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}

        {!isSepolia && (
          <TabList
            onChange={handleChange}
            textColor="primary"
            classes={{ root: classes.tabList, fixed: classes.tabList, flexContainer: classes.tabList, indicator: classes.indicator }}
          >
            {options.map(option => (
              <Tab key={option.value} label={option.label} value={option.value} classes={{ root: classes.tab }}></Tab>
            ))}
          </TabList>
        )}
        <TabPanel value="OfficialBridge" classes={{ root: classes.tabPanel }} sx={{ padding: ["1.6rem !important", "0 !important"] }}>
          <OfficialBridge></OfficialBridge>
        </TabPanel>
        <TabPanel value="ThirdParty" classes={{ root: classes.tabPanel }}>
          <ThirdParty></ThirdParty>
        </TabPanel>
        <TabPanel value="Exchanges" classes={{ root: classes.tabPanel }}>
          <Exchanges></Exchanges>
        </TabPanel>
        <TabPanel value="Buy" classes={{ root: classes.tabPanel }}>
          <Buy></Buy>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Send
