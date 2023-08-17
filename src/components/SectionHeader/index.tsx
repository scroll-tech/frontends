import { isMobileOnly } from "react-device-detect"

import { Stack, Typography } from "@mui/material"

const SectionHeader = props => {
  const { dark, title, content, action, ...rest } = props
  return (
    <Stack
      direction={isMobileOnly ? "column" : "row"}
      spacing={isMobileOnly ? "4.8rem" : "0"}
      justifyContent="space-between"
      alignItems="flex-end"
      {...rest}
    >
      <Stack direction="column" sx={{ width: ["100%", "60rem"] }}>
        <Typography
          sx={{
            fontSize: ["3.2rem", "4.6rem"],
            lineHeight: ["4rem", "5rem"],
            fontWeight: 500,
            mb: ["1.4rem", "2.4rem"],
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.8rem", "2.4rem"],
            lineHeight: ["normal", "3rem"],
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {content}
        </Typography>
      </Stack>
      {action}
    </Stack>
  )
}

export default SectionHeader
