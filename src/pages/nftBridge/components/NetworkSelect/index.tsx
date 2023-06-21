import { makeStyles } from "tss-react/mui"

import { ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material"

import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg"

const useStyles = makeStyles()(theme => ({
  networkSelect: {
    width: "22rem",
    height: "3rem",
    border: "none",
    borderRadius: "0.8rem",
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.boxShadows.sharp,

    ".MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      padding: "0 1rem",

      "&:focus": {
        backgroundColor: "unset",
      },
      "&.Mui-disabled": {
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
    ".MuiTypography-root": {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    ".MuiListItemIcon-root": {
      minWidth: "unset",
    },
    ".MuiSelect-icon": {
      top: "unset",
      right: "1.2rem",
      color: theme.palette.text.primary,
      transform: "scale(0.7)",
    },
    ".MuiSelect-iconOpen": {
      transform: "rotate(180deg) scale(0.7)",
    },
  },
  networkIcon: {
    display: "flex",
    height: "1.6rem",
    margin: "0.4rem",
  },

  networkMenuItem: {
    padding: "0.2rem 1rem",
    ".MuiTypography-root": {
      fontSize: "1.2rem",
    },
    ".MuiListItemIcon-root": {
      minWidth: "unset",
    },
  },
  optionModal: {
    borderRadius: "0 0 0.8rem 0.8rem",
  },
  optionList: {
    padding: 0,
  },
  optionListText: {
    cursor: "pointer",
  },
}))

const NetworkSelect = props => {
  const { options, value, onChange, ...extraProps } = props
  const { classes } = useStyles()
  const icon = options.length <= 1 ? () => null : ArrowDownIcon
  return (
    <Select
      IconComponent={icon}
      id="networkselect"
      MenuProps={{
        classes: {
          paper: classes.optionModal,
          list: classes.optionList,
        },
      }}
      className={classes.networkSelect}
      variant="standard"
      disableUnderline
      value={value}
      onChange={e => onChange(e.target.value)}
      {...extraProps}
    >
      {options?.map(item => (
        <MenuItem className={classes.networkMenuItem} value={item.chainId} key={item.chainId}>
          <ListItemIcon>
            <img src={item.imageUrl} className={classes.networkIcon} alt={"name"} />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.optionListText }}>{item.name}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  )
}

export default NetworkSelect
