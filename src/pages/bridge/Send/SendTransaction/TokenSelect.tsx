import { useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Avatar, ListItemIcon, ListItemText, MenuItem } from "@mui/material"

import { ReactComponent as ArrowDownSvg } from "@/assets/svgs/bridge/arrow-down.svg"

import TokenList from "./TokenList"

const useStyles = makeStyles()(theme => ({
  select: {},
  popover: {
    borderRadius: "0 0 1rem 1rem",
    marginTop: "-1px",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #473835",
    borderRadius: "1rem",
    height: "5.6rem",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    "&.Mui-disabled": {
      backgroundColor: "#FFF5E8",
      border: "1px solid #A39B9A",
      opacity: 1,
      "*": {
        opacity: 0.75,
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.6rem 0.8rem",
      height: "4.8rem",
      gap: "0.6rem",
    },
  },
  readOnly: {
    pointerEvents: "none",
  },
  listItemIcon: { minWidth: "unset !important" },
  listItemText: {
    margin: "0 1rem",
    fontSize: "2rem",
    fontWeight: 500,
    cursor: "pointer",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
}))

const TokenSelect = props => {
  const { options, onChange, value, disabled, readOnly } = props
  const { cx, classes } = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <>
      <MenuItem
        onClick={() => setOpen(true)}
        sx={{ marginLeft: "0.8rem !important" }}
        classes={{ root: cx(classes.menuItem, readOnly && classes.readOnly) }}
        value={value}
        key={value.symbol}
        disabled={disabled}
      >
        <ListItemIcon classes={{ root: classes.listItemIcon }}>
          <Avatar sx={{ width: "2.7rem", height: "2.7rem" }} src={value.logoURI}></Avatar>
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.listItemText }}>{value.symbol}</ListItemText>
        <ArrowDownSvg />
      </MenuItem>
      <TokenList onChange={onChange} selectedValue={value} open={open} tokens={options} onClose={() => setOpen(false)} />
    </>
  )
}

export default TokenSelect
