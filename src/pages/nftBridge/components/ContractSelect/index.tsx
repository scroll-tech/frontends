import { Autocomplete, TextField } from "@mui/material"

const contractList = ["0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b"]

const ContractSelect = props => {
  const { value, onChange } = props

  return (
    <Autocomplete
      disablePortal
      options={contractList}
      sx={{ width: "80rem" }}
      renderInput={params => <TextField {...params} />}
      value={value}
      onChange={(event: any, newValue: string | null) => {
        onChange(newValue ?? "")
      }}
    />
  )
}

export default ContractSelect
