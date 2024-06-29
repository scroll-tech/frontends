import { MenuItem, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { ReactComponent as RegionIcon } from "@/assets/svgs/community/region.svg"
import Select from "@/components/Select"
import { COMMUNITY_REGION_LIST } from "@/constants/community"

const RegionSelect = props => {
  const { value, onChange } = props
  const theme = useTheme()

  const handleChangeNetwork = e => {
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
      onChange={handleChangeNetwork}
      icon={RegionIcon}
    >
      {COMMUNITY_REGION_LIST.filter(item => item !== value).map(item => (
        <MenuItem key={item} value={item} sx={{ px: ["1.6rem", "2.4rem"] }}>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.6rem"], fontWeight: 600, cursor: "inherit" }}>{item}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
export default RegionSelect
