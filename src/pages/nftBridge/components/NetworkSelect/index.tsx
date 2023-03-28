import { Icon, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material"

import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg"

// const useStyles = makeStyles<any>()((theme, { value }) => ({}))

const NetworkSelect = props => {
  const { options, value, onChange } = props
  // const { classes } = useStyles()
  return (
    <Select
      size="small"
      sx={{ bgcolor: "background.default", width: "30rem" }}
      IconComponent={ArrowDownIcon}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options?.map(item => (
        <MenuItem value={item.chainId} key={item.chainId}>
          <ListItemIcon>
            <Icon>
              <img src={item.imageUrl} alt="network logo" />
            </Icon>
          </ListItemIcon>
          <ListItemText>{item.name}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  )
}

export default NetworkSelect
