import { Skeleton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  backgroundColor: "rgba(256, 256, 256, 0.15)",
}))

const Statistic = props => {
  const { label, children, loading } = props
  return (
    <Stack direction="column">
      <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], lineHeight: ["2.4rem", 1.2], fontWeight: 500, whiteSpace: "nowrap" }}>{label}</Typography>
      <NumberTypography sx={{ fontSize: ["3.2rem", "4.8rem"], lineHeight: ["4rem", "5.6rem"], fontWeight: 600, whiteSpace: "nowrap" }}>
        {loading ? <StatisticSkeleton></StatisticSkeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
