import React from "react"

import SearchIcon from "@mui/icons-material/Search"
import { Divider, IconButton, InputBase, Paper } from "@mui/material"

const TokenIdInput = props => {
  const { value, onChange, onEnsure } = props

  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
      <InputBase
        value={value}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{ flex: 1 }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value)
        }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} onClick={onEnsure}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default TokenIdInput
