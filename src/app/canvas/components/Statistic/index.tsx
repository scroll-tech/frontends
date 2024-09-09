import { Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"
import Skeleton from "@/components/Skeleton"

const Statistic = props => {
  const { label, children, loading, ...restProps } = props
  return (
    <Stack direction="column" {...restProps}>
      <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], lineHeight: ["2.8rem", "2.8rem"], fontWeight: 500, whiteSpace: "nowrap" }}>
        {label}
      </Typography>
      <NumberTypography
        sx={{
          fontSize: ["1.8rem", "2rem"],
          lineHeight: ["3.2rem", "2.8rem"],
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
