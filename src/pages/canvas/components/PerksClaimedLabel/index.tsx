import { Box, Typography } from "@mui/material"

const PerksClaimedLabel = props => {
  const { sx, children } = props
  return (
    <Box
      sx={{
        backgroundColor: "rgba(144, 248, 234, 0.20)",
        borderRadius: "2.8rem",
        width: "100%",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.6rem", "2rem"],
          height: ["4rem", "5.6rem"],
          lineHeight: ["4rem", "5.6rem"],
          fontWeight: 600,
          color: "#90F8EA",
          cursor: "not-allowed",
        }}
      >
        {children ?? "This perk has been claimed"}
      </Typography>
    </Box>
  )
}

export default PerksClaimedLabel
