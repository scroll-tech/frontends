import { useState } from "react"

import { MenuItem, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import Select from "@/components/Select"
import { ECOSYSTEM_NETWORK_LIST } from "@/constants"

const Filter = props => {
  const { onChange } = props
  const theme = useTheme()
  const [network, setNetwork] = useState(ECOSYSTEM_NETWORK_LIST[0])

  const handleChangeNetwork = e => {
    setNetwork(e.target.value)
    onChange(e.target.value)
  }

  return (
    <Select
      sx={{
        [theme.breakpoints.down("md")]: {
          gridRow: "2 / 3",
        },
      }}
      value={network}
      onChange={handleChangeNetwork}
    >
      {ECOSYSTEM_NETWORK_LIST.filter(item => item !== network).map(item => (
        <MenuItem key={item} value={item} sx={{ px: ["1.6rem", "2.4rem"] }}>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600, cursor: "inherit" }}>{item}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
export default Filter
