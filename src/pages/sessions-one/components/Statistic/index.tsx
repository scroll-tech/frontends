import { Skeleton, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

import NumberTypography from "@/components/NumberTypography"

const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "8rem",
  height: ["2.4rem", "2.8rem", "4rem"],
  display: "inline-block",
}))

const Statistic = props => {
  const { count, sx, large, isLoading } = props
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: ["8rem", "11rem", "11rem"],
        height: ["4rem", "4.8rem", "4.8rem"],
        backgroundColor: "themeBackground.light",
        borderRadius: "0.8rem",
        px: "0.4rem",
        ...sx,
      }}
    >
      {isLoading ? (
        <StatisticSkeleton></StatisticSkeleton>
      ) : (
        <NumberTypography
          sx={{
            fontSize: large ? ["1.8rem", "4rem"] : ["1.8rem", "2.4rem"],
            lineHeight: large ? ["2.8rem", "4.8rem"] : ["2.4rem", "2.8rem"],
            fontWeight: 600,

            fontFamily: "var(--developer-page-font-family)",

            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {count}
        </NumberTypography>
      )}
    </Stack>
  )
}

export default Statistic
