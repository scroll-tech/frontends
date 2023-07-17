import { makeStyles } from "tss-react/mui"

import { Select as MuiSelect, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as TriangleDownIcon } from "@/assets/svgs/refactor/triangle-down.svg"
import { ReactComponent as WidgetsIcon } from "@/assets/svgs/refactor/widgets.svg"

const useStyles = makeStyles()(theme => ({
  select: {
    width: "44rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    ".MuiSelect-select": {
      padding: "1.3rem 3.2rem 1.3rem 1.8rem",

      [theme.breakpoints.down("sm")]: {
        padding: "1.2rem 3.2rem 1.1rem 1.8rem",
      },
      backgroundColor: `${theme.palette.background.default} !important`,
      "&[aria-expanded='true']": {
        borderRadius: "2.6rem 2.6rem 0 0",
        border: `1px solid ${theme.palette.text.primary}`,
        borderBottom: "none",
      },
      "&[aria-expanded='false']": {
        borderRadius: "2.6rem",
        border: `1px solid ${theme.palette.text.primary}`,
      },
      "&:focus": {
        backgroundColor: "unset",
      },
    },
    ".MuiSelect-icon": {
      top: "50%",
      transform: "translateY(-50%)",
      right: "1.8rem",
    },
    ".MuiSelect-iconOpen": {
      transform: "translateY(-50%) rotate(180deg)",
    },
  },
  popover: {
    boxShadow: "none",
    borderRadius: "0 0 2.6rem 2.6rem",
    border: `1px solid ${theme.palette.text.primary}`,
    borderTop: "none",
    transform: "translateX(0) !important",
    transition: "transform 227ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
  },
  menuList: {
    paddingTop: "1.2rem",
    paddingBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.4rem",
      paddingBottom: "3rem",
    },
  },
}))

const Select = props => {
  const { classes } = useStyles()
  return (
    <MuiSelect
      variant="standard"
      disableUnderline
      displayEmpty
      IconComponent={TriangleDownIcon}
      className={classes.select}
      MenuProps={{ PopoverClasses: { paper: classes.popover }, MenuListProps: { classes: { root: classes.menuList } } }}
      renderValue={selected => {
        return (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <SvgIcon sx={{ fontSize: "2rem" }} component={WidgetsIcon} inheritViewBox></SvgIcon>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"], fontWeight: [500, 600], lineHeight: "normal" }}>
              {!selected ? "All categories" : (selected as string)}
            </Typography>
          </Stack>
        )
      }}
      {...props}
    ></MuiSelect>
  )
}

export default Select
