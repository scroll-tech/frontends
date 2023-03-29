import { Stack, Typography } from "@mui/material"

const Fee = () => {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography variant="body2" color="secondary">
        Fees
      </Typography>
      <Typography variant="body2" color="secondary">
        0.003ETH
      </Typography>
    </Stack>
  )
}

export default Fee
