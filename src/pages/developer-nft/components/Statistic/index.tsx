import { Stack, Typography } from "@mui/material"

const Statistic = props => {
  const { label, children } = props
  return (
    <Stack direction="column">
      <Typography sx={{ fontSize: "2.4rem", fontWeight: 500 }}>{label}</Typography>
      <Typography sx={{ fontSize: "5.6rem", fontWeight: 600 }}>{children}</Typography>
    </Stack>
  )
}

export default Statistic
