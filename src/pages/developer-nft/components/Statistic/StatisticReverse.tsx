import { Stack, Typography } from "@mui/material"

const StatisticReverse = props => {
  const { title, subTitle, size } = props
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" sx={{ width: size === "small" ? "38.8rem" : "10rem" }}>
      <Typography sx={{ fontSize: size === "small" ? "4.8rem" : "6.4rem", lineHeight: size === "small" ? "5.6rem" : "7.2rem", fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "2.4rem", fontWeight: 600 }}>{subTitle}</Typography>
    </Stack>
  )
}

export default StatisticReverse
