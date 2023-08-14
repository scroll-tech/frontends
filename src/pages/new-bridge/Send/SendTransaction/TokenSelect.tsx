import { makeStyles } from "tss-react/mui"

import { Avatar, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material"

import { ReactComponent as ArrowDownSvg } from "@/assets/svgs/refactor/bridge-arrow-down.svg"

const useStyles = makeStyles()(theme => ({
  select: {
    ".MuiSelect-select": {
      width: "18rem",
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      padding: "0.65rem 5rem 0.6rem 2.5rem",
      boxSizing: "border-box",
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      borderRadius: "1rem",
      "&:focus": {
        backgroundColor: theme.palette.themeBackground.optionHightlight,
        borderRadius: "1rem",
      },
    },
    ".MuiSelect-icon": {
      top: "50%",
      transform: "translateY(-50%)",
      right: "2.5rem",
      color: theme.palette.text.primary,
    },
    ".MuiSelect-iconOpen": {
      transform: "translateY(-50%) rotate(180deg)",
    },
  },
  menuItem: {
    padding: "0.6rem 2.5rem",
  },
  listItemIcon: { minWidth: "unset" },
  listItemText: {
    fontSize: "2.4rem",
    fontWeight: 600,
  },
}))

const TokenSelect = props => {
  const { options, ...restProps } = props
  const { classes } = useStyles()

  return (
    <Select IconComponent={ArrowDownSvg} className={classes.select} variant="standard" disableUnderline {...restProps}>
      {options?.map((token: any) => (
        <MenuItem classes={{ root: classes.menuItem }} value={token} key={token.symbol}>
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <Avatar sx={{ width: "2.7rem", height: "2.7rem" }} src={token.logoURI}></Avatar>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.listItemText }}>{token.symbol}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  )
}

export default TokenSelect
