import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import useCheckViewport from "@/hooks/useCheckViewport"

const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
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
      alignItems={!content ? "center" : isPortrait ? "flex-start" : "flex-end"}
      {...rest}
    >
      <Stack direction="column" sx={{ maxWidth: ["100%", action && content ? "60rem" : "100%"] }}>
        <Typography
          sx={{
            fontSize: ["3.2rem", "4.6rem"],
            fontWeight: 500,
            color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
          }}
        >
          {title}
        </Typography>
        {content && (
          <Typography
            sx={{
              mt: ["0.8rem", "1.4rem"],
              fontSize: ["1.8rem", "2.4rem"],
              color: theme => (dark ? theme.palette.primary.contrastText : "unset"),
            }}
          >
            {content}
          </Typography>
        )}
      </Stack>
      <ActionWrapper>{action}</ActionWrapper>
    </Stack>
  )
}

export default SectionHeader
