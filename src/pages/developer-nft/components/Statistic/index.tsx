import { Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = props => {
  const { label, children } = props
  return (
    <Stack direction="column">
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 500 }}>{label}</Typography>
      <NumberTypography sx={{ fontSize: ["3.2rem", "5.6rem"], fontWeight: 600 }}>{children}</NumberTypography>
    </Stack>
  )
}

export default Statistic
