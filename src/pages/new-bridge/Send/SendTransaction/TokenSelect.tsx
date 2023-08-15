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
      "&:focus": {
        backgroundColor: theme.palette.themeBackground.optionHightlight,
        borderRadius: "1rem",
      },
      "&[aria-expanded='true']": {
        borderRadius: "1rem 1rem 0 0",
      },
      "&[aria-expanded='false']": {
        borderRadius: "1rem",
      },
      [theme.breakpoints.down("sm")]: {
        width: "11rem",
        height: "5.4rem",
        gap: "0.8rem",
        padding: "0.8rem 1rem",
      },
    },
    ".MuiSelect-icon": {
      top: "50%",
      transform: "translateY(-50%)",
      right: "2.5rem",
      color: theme.palette.text.primary,
      [theme.breakpoints.down("sm")]: {
        right: "1rem",
      },
    },
    ".MuiSelect-iconOpen": {
      transform: "translateY(-50%) rotate(180deg)",
    },
  },
  popover: {
    borderRadius: "0 0 1rem 1rem",
    marginTop: "-1px",
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    padding: "1rem 2.5rem",
    backgroundColor: theme.palette.themeBackground.optionHightlight,
    "&:hover": {
      backgroundColor: theme.palette.themeBackground.optionHightlight,
    },

    "&.Mui-selected": {
      backgroundColor: theme.palette.themeBackground.optionHightlight,
      "&:hover": {
        backgroundColor: theme.palette.themeBackground.optionHightlight,
      },
      "&:focus": {
        backgroundColor: theme.palette.themeBackground.optionHightlight,
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0.8rem 1rem",
    },
  },
  listItemIcon: { minWidth: "unset" },
  listItemText: {
    fontSize: "2.4rem",
    fontWeight: 600,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },
}))

const TokenSelect = props => {
  const { options, ...restProps } = props
  const { classes } = useStyles()

  return (
    <Select
      IconComponent={ArrowDownSvg}
      className={classes.select}
      variant="standard"
      MenuProps={{
        PopoverClasses: { paper: classes.popover },
        MenuListProps: { classes: { root: classes.menuList } },
      }}
      disableUnderline
      {...restProps}
    >
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
