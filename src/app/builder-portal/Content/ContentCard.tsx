import { Chip, Stack, Typography } from "@mui/material"

const ContentCard = props => {
  const { icon: IconSvg, title, description, upcoming } = props

  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: "themeBackground.light",
        borderRadius: "2.4rem",
        p: "3rem",
        height: "100%",

        position: "relative",

        "&:hover": {
          backgroundColor: upcoming ? "themeBackground.light" : "#FFF6EB",
        },

        "&::before": {
          display: upcoming ? "block" : "none",
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: "opacity(50%)",
          backgroundColor: "background.default",
          borderRadius: "2.4rem",
        },
      }}
    >
      <IconSvg className="w-[2rem] sm:w-[2.4rem] h-auto"></IconSvg>
      <Typography sx={{ fontSize: ["1.4rem", "2rem"], fontWeight: 500, lineHeight: "normal", mt: "2rem", mb: [0, "0.8rem"], cursor: "inherit" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["normal", "2.2rem"], cursor: "inherit" }}>{description}</Typography>
      {upcoming && (
        <Chip
          sx={{
            backgroundColor: "#B5F5EC",
            p: 0,
            height: "auto",
            width: "fit-content",

            position: "absolute",
            top: ["1.6rem", "2.2rem"],
            right: ["1.6rem", "2.4rem"],

            opacity: 1,

            ".MuiChip-label": {
              fontSize: "1.2rem",
              fontWeight: 600,
              lineHeight: "2rem",
              p: "0 0.8rem",
            },
          }}
          label="Coming soon"
        ></Chip>
      )}
    </Stack>
  )
}

export default ContentCard
