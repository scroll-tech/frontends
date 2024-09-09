import { MenuItem, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import TimeIcon from "@/assets/svgs/community/time.svg"
import Select from "@/components/Select"
import { COMMUNITY_TIME_LIST } from "@/constants/community"

const TimeSelect = props => {
  const { value, onChange } = props
  const theme = useTheme()

  const handleChangeTime = e => {
    onChange(e.target.value)
  }

  return (
    <Select
      sx={{
        [theme.breakpoints.down("md")]: {
          gridRow: "2 / 3",
        },
      }}
      value={value}
      onChange={handleChangeTime}
      icon={TimeIcon}
    >
      {COMMUNITY_TIME_LIST.filter(item => item !== value).map(item => (
        <MenuItem key={item} value={item} sx={{ px: ["1.6rem", "2.4rem"] }}>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600, cursor: "inherit" }}>{item}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
export default TimeSelect
