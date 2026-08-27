import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Box, Tooltip as MuiTooltip, Typography } from "@mui/material"

const Tooltip = props => {
  return (
    <MuiTooltip title={props.title}>
      <Box display="inline-flex" alignItems="center">
        <Typography align="left" sx={{ fontWeight: 500, fontSize: "1.6rem" }}>
          {props.name}
        </Typography>
        <InfoOutlinedIcon sx={{ fontSize: "2rem", marginLeft: "0.4rem" }} />
      </Box>
    </MuiTooltip>
  )
}

export default Tooltip
