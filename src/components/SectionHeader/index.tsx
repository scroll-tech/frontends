import { Stack, Typography } from "@mui/material"

const SectionHeader = props => {
  const { dark, title, content, action } = props
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: "12rem" }}>
      <Stack direction="column" sx={{ width: "56rem" }}>
        <Typography
          sx={{
            fontSize: "4.6rem",
            lineHeight: "5rem",
            fontWeight: 500,
            mb: "2.4rem",
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "2.4rem", lineHeight: "3rem", color: theme => (dark ? theme.palette.primary.contrastText : "unset") }}>
          {content}
        </Typography>
      </Stack>
      {action}
    </Stack>
  )
}

export default SectionHeader
