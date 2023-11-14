import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import useCheckViewport from "@/hooks/useCheckViewport"

const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
}))

const SectionHeader = props => {
  const { dark, title, content, action, ...rest } = props
  const { isPortrait } = useCheckViewport()

  return (
    <Stack
      direction={isPortrait ? "column" : "row"}
      spacing={isPortrait && action ? "4.8rem" : "0"}
      justifyContent="space-between"
      alignItems={isPortrait ? "flex-start" : "flex-end"}
      {...rest}
    >
      <Stack direction="column" sx={{ maxWidth: ["100%", action ? "60rem" : "100%"] }}>
        <Typography
          sx={{
            fontSize: ["3.2rem", "4.6rem"],
            fontWeight: 500,
            mb: ["0.8rem", "1.4rem"],
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.8rem", "2.4rem"],
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {content}
        </Typography>
      </Stack>
      <ActionWrapper>{action}</ActionWrapper>
    </Stack>
  )
}

export default SectionHeader
