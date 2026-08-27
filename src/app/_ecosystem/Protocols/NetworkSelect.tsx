import { MenuItem, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import Select from "@/components/Select"
import { ECOSYSTEM_NETWORK_LIST } from "@/constants"

const NetworkSelect = props => {
  const { sticky, top, value, onChange } = props
  const theme = useTheme()

  const handleChangeNetwork = e => {
    onChange(e.target.value)
  }

  return (
    <Select
      sx={{
        [theme.breakpoints.up("md")]: {
          position: sticky ? "sticky" : "static",
          top,
          zIndex: 1,
        },

        [theme.breakpoints.down("md")]: {
          gridRow: "2 / 3",
        },
      }}
      value={value}
      onChange={handleChangeNetwork}
    >
      {ECOSYSTEM_NETWORK_LIST.filter(item => item !== value).map(item => (
        <MenuItem key={item} value={item} sx={{ px: ["1.6rem", "2.4rem"] }}>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600, cursor: "inherit" }}>{item}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
export default NetworkSelect
