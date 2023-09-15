import { Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const StatisticReverse = props => {
  const { title, subTitle, size, sx } = props
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: size === "small" ? ["12rem", "28rem", "38.8rem"] : ["6rem", "10rem"], ...sx }}
    >
      <NumberTypography
        sx={{
          fontSize: size === "small" ? ["2rem", "4.8rem"] : ["3.2rem", "6.4rem"],
          lineHeight: size === "small" ? ["3.2rem", "5.6rem"] : ["4rem", "7.2rem"],
          fontWeight: 600,
        }}
      >
        {title}
      </NumberTypography>
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600 }}>{subTitle}</Typography>
    </Stack>
  )
}

export default StatisticReverse
