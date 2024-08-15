import { makeStyles } from "tss-react/mui"

import { MenuItem, Select as MuiSelect, Typography } from "@mui/material"

import { ReactComponent as TriangleDownIcon } from "@/assets/svgs/common/triangle-down.svg"

const useStyles = makeStyles()(theme => ({
  root: {
    width: "24rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  select: {
    padding: "0.6rem 2.4rem 0.6rem 2.4rem !important",

    backgroundColor: `${theme.palette.themeBackground.tag} !important`,
    borderRadius: "2.4rem !important",
    p: {
      color: theme.palette.primary.contrastText,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "1.1rem 4.2rem 1.1rem 1.6rem !important",
    },
  },
  icon: {
    top: "50%",
    transform: "translateY(-50%)",
    right: "2.4rem",
    willChange: "transform",
    transition: "transform .3s ease-in-out",
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      right: "2rem",
    },
  },
  iconOpen: {
    transform: "translateY(-50%) rotate(180deg)",
  },
  popover: {
    borderRadius: "0.5rem",
    marginTop: "0.8rem",
  },
  menuList: {
    padding: "0.8rem 0",
  },
}))

const Select = props => {
  const { className, items = [], ...restProps } = props
  const { classes, cx } = useStyles()

  return (
    <MuiSelect
      variant="standard"
      disableUnderline
      displayEmpty
      IconComponent={TriangleDownIcon}
      className={cx(classes.root, className)}
      classes={{ select: classes.select, icon: classes.icon, iconOpen: classes.iconOpen }}
      MenuProps={{
        PopoverClasses: {
          paper: cx(classes.popover),
        },
        MenuListProps: { classes: { root: classes.menuList } },
        disableAutoFocusItem: true,
      }}
      {...restProps}
    >
      {items.map(({ key, label }) => (
        <MenuItem
          key={key}
          value={key}
          sx={{
            p: "0.8rem 2.4rem",
            "&.Mui-selected": { backgroundColor: "#eee", "&:hover": { backgroundColor: "#eee" } },
            "&:hover": { backgroundColor: "#eee" },
          }}
        >
          <Typography
            sx={{
              fontSize: ["1.6rem", "1.8rem"],
              lineHeight: ["2.4rem", "3.6rem"],
              fontWeight: 600,
              cursor: "inherit",
            }}
          >
            {label}
          </Typography>
        </MenuItem>
      ))}
    </MuiSelect>
  )
}

export default Select
