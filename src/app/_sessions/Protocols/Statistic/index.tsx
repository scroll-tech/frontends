import { forwardRef } from "react"

import { Skeleton, Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = forwardRef<any, any>((props, ref) => {
  const { count, sx, loading, upcoming, ...restProps } = props

  const renderContent = () => {
    if (upcoming) {
      return (
        <Typography
          sx={{
            fontSize: ["1.2rem", "1.4rem"],
            lineHeight: ["2rem", "2.4rem"],
            fontWeight: 600,
            cursor: "inherit",
          }}
        >
          Coming soon
        </Typography>
      )
    }
    if (loading) {
      return (
        <Skeleton
          sx={{ borderRadius: "0.6rem", width: "6rem", height: ["1.6rem", "2rem"], my: "0.2rem", display: "inline-block", transform: "unset" }}
        ></Skeleton>
      )
    }
    return (
      <NumberTypography
        sx={{
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2rem", "2.4rem"],
          fontWeight: 600,
          width: "100%",
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          cursor: "inherit",
          px: "0.9rem",
        }}
      >
        {count}
      </NumberTypography>
    )
  }
  return (
    <Stack
      ref={ref}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "background.default",
        borderRadius: "0.8rem",
        p: "0.4rem 1.5rem",
        minWidth: "11rem",
        ...sx,
      }}
      {...restProps}
    >
      {renderContent()}
    </Stack>
  )
})

export default Statistic
