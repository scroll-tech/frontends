import { Typography } from "@mui/material"

const NumberTypography = ({ sx, ...restProps }) => {
  return <Typography sx={{ fontFamily: "var(--developer-page-font-family)", ...sx }} {...restProps}></Typography>
}

export default NumberTypography
