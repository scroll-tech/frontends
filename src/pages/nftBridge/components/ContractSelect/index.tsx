import { Autocomplete, Chip, TextField, Typography } from "@mui/material"
import { Stack } from "@mui/system"

const ContractSelect = props => {
  const { value, data, onChange } = props

  return (
    <Autocomplete
      disablePortal
      sx={{ width: "80rem" }}
      value={value}
      options={data}
      getOptionLabel={option => option?.l1 ?? ""}
      renderInput={params => <TextField {...params} />}
      renderOption={(innerProps: any, option, state) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }} {...innerProps}>
          <Chip label={option.type} variant="outlined" />
          <Typography>{option.l1}</Typography>
        </Stack>
      )}
      onChange={(event, newValue) => {
        onChange(newValue)
      }}
    />
  )
}

export default ContractSelect
