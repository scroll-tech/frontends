import { Stack, Typography } from "@mui/material"

const PrivateCard = props => {
  const { Icon, title, content, sx } = props

  return (
    <Stack
      sx={{
        backgroundColor: "#21201E",
        borderRadius: "2rem",
        px: ["1.5rem", "4rem"],
        py: ["2rem", "3rem"],
        gap: "1.2rem",
        maxWidth: "400px",
        height: "min-content",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", gap: "1rem" }}>
        <Icon />
        <Typography
          sx={{
            typography: "title",
            fontSize: ["1.8rem", "1.8rem"],
            lineHeight: ["2.8rem", "2.8rem"],
            color: "background.default",
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: ["1.6rem", "1.6rem"],
          lineHeight: ["2.4rem", "2.4rem"],
          color: "background.default",
        }}
      >
        {content}
      </Typography>
    </Stack>
  )
}

export default PrivateCard
