import { Skeleton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "50%",
  display: "inline-block",
}))

const Statistic = props => {
  const { label, children, loading } = props
  const theme = useTheme()

  return (
    <Stack
      direction="column"
      sx={{
        flex: 1,
        borderRadius: ["0.8rem", "1.6rem"],
        p: ["0.8rem 1.2rem", "1.6rem 2.4rem"],
        backgroundColor: theme => theme.palette.themeBackground.normal,
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.8rem"],
          lineHeight: ["2rem", "2.8rem"],
          fontWeight: 600,
          textAlign: "center",
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
      <NumberTypography
        sx={{ fontSize: ["2rem", "4.8rem"], lineHeight: ["3.2rem", "5.6rem"], fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}
      >
        {loading ? <StatisticSkeleton></StatisticSkeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
