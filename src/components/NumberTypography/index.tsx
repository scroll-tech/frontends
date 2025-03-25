import { Typography } from "@mui/material"

const NumberTypography = ({ sx, ...restProps }) => {
  return <Typography sx={{ fontFamily: "var(--font-developer)", ...sx }} {...restProps}></Typography>
}

export default NumberTypography
