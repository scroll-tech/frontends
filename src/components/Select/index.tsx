import { makeStyles } from "tss-react/mui"

import { Select as MuiSelect, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as TriangleDownIcon } from "@/assets/svgs/refactor/triangle-down.svg"
import { ReactComponent as WidgetsIcon } from "@/assets/svgs/refactor/widgets.svg"

const useStyles = makeStyles()(theme => ({
  select: {
    width: "44rem",
    ".MuiSelect-select": {
      padding: "1.3rem 3.2rem 1.3rem 1.8rem",
      backgroundColor: `${theme.palette.background.default} !important`,
      "&[aria-expanded='true']": {
        borderRadius: "2.6rem 2.6rem 0 0",
        border: "1px solid #101010",
        borderBottom: "none",
      },
      "&[aria-expanded='false']": {
        borderRadius: "2.6rem",
        border: "1px solid #101010",
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
    border: "1px solid #101010",
    borderTop: "none",
    transform: "translateX(-0.5px) !important",
    transition: "transform 227ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
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
      MenuProps={{ PopoverClasses: { paper: classes.popover } }}
      renderValue={selected => {
        if (!selected) {
          return (
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <SvgIcon sx={{ fontSize: "2rem" }} component={WidgetsIcon} inheritViewBox></SvgIcon>
              <Typography sx={{ fontSize: "2rem", fontWeight: 600, lineHeight: "normal" }}>All categories</Typography>
            </Stack>
          )
        }

        return (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <SvgIcon sx={{ fontSize: "2rem" }} component={WidgetsIcon} inheritViewBox></SvgIcon>
            <Typography sx={{ fontSize: "2rem", fontWeight: 600, lineHeight: "normal" }}>{selected as string}</Typography>
          </Stack>
        )
      }}
      {...props}
    ></MuiSelect>
  )
}

export default Select
