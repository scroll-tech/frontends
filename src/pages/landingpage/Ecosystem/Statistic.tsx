import { Skeleton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "12rem",
  display: "inline-block",
}))

const Statistic = props => {
  const { label, children, loading } = props
  const theme = useTheme()

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: ["0.8rem 1.2rem", "3.6rem 0"],
        gap: "0.8rem",
      }}
    >
      <NumberTypography
        sx={{ fontSize: ["2rem", "4.8rem"], lineHeight: ["3.2rem", "5.6rem"], fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}
      >
        {loading ? <StatisticSkeleton></StatisticSkeleton> : <>{children}</>}
      </NumberTypography>
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2rem", "2.4rem"],
          maxWidth: "11rem",
          fontWeight: 500,
          textAlign: "left",
          [theme.breakpoints.down("md")]: {
            flex: 1,
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "center",
          },
        }}
      >
        {label}
      </Typography>
    </Stack>
  )
}

export default Statistic
