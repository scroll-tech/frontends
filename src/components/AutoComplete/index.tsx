import { makeStyles } from "tss-react/mui"

import { Autocomplete, IconButton, SvgIcon, TextField } from "@mui/material"

import { ReactComponent as TriangleDownIcon } from "@/assets/svgs/common/triangle-down.svg"
import { ReactComponent as WidgetsIcon } from "@/assets/svgs/common/widgets.svg"

const useStyles = makeStyles()(theme => {
  return {
    AutocompleteRoot: {
      width: "44rem",
      height: "5.4rem",
      // color: "#7e7e7e",
    },
    listbox: {
      // padding: 0,
    },
    input: {
      fontSize: "1.4rem",
      height: "1.8rem",
      color: "#101010",
      userSelect: "none",
    },
    inputRoot: {
      backgroundColor: theme.palette.background.default,
    },
    option: {
      // paddingLeft: "0.6rem !important",
      // paddingRight: "0.6rem !important",
      // justifyContent: "space-between !important",
      // width: "calc(100% + 38px)",
    },

    clearIndicator: {
      transform: "scale(0.6)",
    },
  }
})

const Select = props => {
  const { value, data, onChange } = props
  const { classes } = useStyles()
  return (
    <Autocomplete
      disablePortal
      value={value}
      options={data}
      popupIcon={<SvgIcon sx={{ fontSize: "1.4rem" }} component={TriangleDownIcon} inheritViewBox></SvgIcon>}
      classes={{
        root: classes.AutocompleteRoot,
        listbox: classes.listbox,
        input: classes.input,
        inputRoot: classes.inputRoot,
        option: classes.option,
        clearIndicator: classes.clearIndicator,
      }}
      slotProps={{
        paper: {
          elevation: 0,
        },
      }}
      renderInput={({ InputProps, ...restProps }) => (
        <TextField
          InputProps={{
            ...InputProps,
            startAdornment: (
              <IconButton component="span">
                <SvgIcon sx={{ fontSize: "2rem" }} component={WidgetsIcon} inheritViewBox></SvgIcon>
              </IconButton>
            ),
          }}
          placeholder="All categories"
          sx={{
            "& fieldset": { border: "none" },
          }}
          {...restProps}
        ></TextField>
      )}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
    />
  )
}

export default Select
