import { Stack, Typography } from "@mui/material"

const PrivateCard = props => {
  const { Icon, title, content, sx } = props

  return (
    <Stack
      sx={{
        backgroundColor: "#21201E",
        borderRadius: "2rem",
        p: ["2rem", "2rem"],
        gap: "1.2rem",
        maxWidth: "360px",
        height: "min-content",

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
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2.2rem", "2.4rem"],
          color: "background.default",
        }}
      >
        {content}
      </Typography>
    </Stack>
  )
}

export default PrivateCard
