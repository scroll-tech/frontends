import { makeStyles } from "tss-react/mui"

import { Autocomplete, Chip, Icon, Stack, TextField, Typography } from "@mui/material"

import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg"
import { ChainId } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useStyles = makeStyles()(theme => {
  return {
    AutocompleteRoot: {
      width: "56rem",
      color: "#7e7e7e",
    },
    listbox: {
      padding: 0,
    },
    input: {
      fontSize: "1.4rem",
      height: "1.8rem",
      color: "#7e7e7e",
      userSelect: "none",
    },
    inputRoot: {
      backgroundColor: "#e0e0e0",
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.default,
      },
    },
    inputFocused: {},
    option: {
      paddingLeft: "0.6rem !important",
      paddingRight: "0.6rem !important",
    },

    StackRoot: {
      alignItems: "center",
    },

    ChipRoot: {
      height: "auto",
      padding: "0 4px",
      borderRadius: "4px",
      backgroundColor: "#e0e0e0",
    },
    label: {
      fontSize: "1rem",
      color: "#7e7e7e",
      padding: 0,
    },

    clearIndicator: {
      transform: "scale(0.6)",
    },
  }
})

const ContractSelect = props => {
  const { value, data, onChange } = props
  const { checkConnectedChainId } = useWeb3Context()
  const { classes } = useStyles()
  return (
    <Autocomplete
      disablePortal
      value={value}
      options={data}
      popupIcon={<Icon sx={{ transform: "scale(0.6)" }} component={ArrowDownIcon}></Icon>}
      size="small"
      classes={{
        root: classes.AutocompleteRoot,
        listbox: classes.listbox,
        input: classes.input,
        inputRoot: classes.inputRoot,
        option: classes.option,
        clearIndicator: classes.clearIndicator,
      }}
      getOptionLabel={option => (checkConnectedChainId(ChainId.SCROLL_LAYER_1) ? option?.l1 : option?.l2) ?? ""}
      renderInput={params => (
        <TextField
          sx={{
            "& fieldset": { border: "none" },
          }}
          {...params}
        ></TextField>
      )}
      renderOption={(innerProps: any, option, state) => (
        <Stack direction="row" spacing={0.75} classes={{ root: classes.StackRoot }} {...innerProps}>
          <Chip label={option.type} classes={{ root: classes.ChipRoot, label: classes.label }} />
          <Typography variant="body2">{checkConnectedChainId(ChainId.SCROLL_LAYER_1) ? option.l1 : option.l2}</Typography>
        </Stack>
      )}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
    />
  )
}

export default ContractSelect
