import { Skeleton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "50%",
  display: "inline-block",
}))

const Statistic = props => {
  const { label, children, loading } = props

  return (
    <Stack
      direction="column"
      sx={{
        flex: 1,
        width: "30rem",
        borderRadius: ["0.8rem", "1.6rem"],
        backgroundColor: "rgba(38, 38, 38, 0.50)",
        p: ["1.6rem", "1.6rem 2.4rem"],
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.8rem"],
          lineHeight: ["2rem", "2.8rem"],
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      <NumberTypography
        sx={{ fontSize: ["2rem", "4rem"], lineHeight: ["3.2rem", "5.6rem"], fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}
      >
        {loading ? <StatisticSkeleton></StatisticSkeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
