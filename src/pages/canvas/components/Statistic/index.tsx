import { Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"
import Skeleton from "@/components/Skeleton"

const Statistic = props => {
  const { label, children, loading, ...restProps } = props
  return (
    <Stack direction="column" {...restProps}>
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", 1.2], fontWeight: 500, whiteSpace: "nowrap" }}>{label}</Typography>
      <NumberTypography
        sx={{
          fontSize: ["3.2rem", "3.2rem"],
          lineHeight: ["4rem", "5.6rem"],
          fontWeight: 600,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
        }}
      >
        {loading ? <Skeleton dark></Skeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
