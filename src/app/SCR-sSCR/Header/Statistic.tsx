import { Skeleton, Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = props => {
  const { label, children, loading, sx } = props

  return (
    <Stack
      direction="column"
      sx={{
        flex: [1, "0 0 auto"],
        width: ["auto", "18rem"],
        maxWidth: "50%",
        borderRadius: ["0.8rem", "1.6rem"],
        p: ["0.8rem", "0.8rem 1.6rem"],
        backgroundColor: "themeBackground.light",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2rem", "2.4rem"],
          fontWeight: 600,
          textAlign: "center",
          whiteSpace: ["pre-wrap", "pre-wrap", "nowrap"],
        }}
      >
        {label}
      </Typography>
      <NumberTypography
        sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.8rem", "3.2rem"], fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}
      >
        {loading ? <Skeleton sx={{ borderRadius: "1rem", width: "50%", display: "inline-block" }}></Skeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
