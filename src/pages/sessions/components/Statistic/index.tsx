import { Skeleton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "12rem",
  height: ["2.4rem", "2.8rem", "4rem"],
  display: "inline-block",
}))

const Statistic = props => {
  const { count, label, sx, large, isLoading } = props
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={large ? 0 : [0, "4px"]}
      sx={{
        // p: large ? ["0.8rem 1.6rem", "1.6rem 2.9rem"] : ["0.4rem 0.8rem", "0.8rem 1.6rem"],
        // width: large ? ["16.8rem"] : ["10.3rem"],
        // height: large ? ["8.4rem"] : ["5.2rem"],
        width: ["10.3rem", "16.8rem", "16.8rem"],
        height: ["5.2rem", "8.4rem", "8.4rem"],
        backgroundColor: "themeBackground.light",
        borderRadius: large ? ["0.8rem", "1.6rem"] : "0.8rem",
        ...sx,
      }}
    >
      {isLoading ? (
        <StatisticSkeleton></StatisticSkeleton>
      ) : (
        <NumberTypography
          sx={{
            fontSize: large ? ["1.8rem", "4rem"] : ["1.8rem", "2.4rem", "3.2rem"],
            lineHeight: large ? ["2.8rem", "4.8rem"] : ["2.4rem", "2.8rem", "4rem"],
            fontWeight: 600,
            fontFamily: "var(--developer-page-font-family)",
          }}
        >
          {count}
        </NumberTypography>
      )}
      <Typography
        sx={{
          fontSize: large ? ["1.4rem", "1.8rem"] : ["1.4rem", "1.6rem"],
          lineHeight: large ? ["2rem", "2.8rem"] : ["2rem", "2.4rem"],
          fontWeight: large ? 600 : 400,
        }}
      >
        {label}
      </Typography>
    </Stack>
  )
}

export default Statistic
