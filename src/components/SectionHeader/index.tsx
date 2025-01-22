"use client"

import { useMemo } from "react"

import { Box, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import useCheckViewport from "@/hooks/useCheckViewport"

const ActionWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
}))

const SectionHeader = props => {
  const { dark, title, content, action, maxWidth, ...rest } = props
  const { isPortrait } = useCheckViewport()

  const maxWidthValue = useMemo(() => {
    if (Array.isArray(maxWidth)) {
      return ["100%", ...maxWidth]
    } else if (maxWidth) {
      return ["100%", maxWidth]
    } else if (action) {
      return ["100%", "60rem"]
    }
    return "100%"
  }, [maxWidth])

  return (
    <Stack
      direction={isPortrait ? "column" : "row"}
      spacing={isPortrait && action ? "3.2rem" : "0"}
      justifyContent="space-between"
      alignItems={isPortrait ? "flex-start" : "flex-end"}
      {...rest}
    >
      <Stack direction="column" sx={{ maxWidth: maxWidthValue }}>
        <Typography
          sx={{
            fontSize: ["3.2rem", "4.6rem"],
            fontWeight: 500,
            mb: ["0.8rem", "1.4rem"],
            color: theme => (dark ? (theme as any).vars.palette.primary.contrastText : "unset"),
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.8rem", "2.4rem"],
            color: theme => (dark ? (theme as any).vars.palette.primary.contrastText : "unset"),
          }}
        >
          {content}
        </Typography>
      </Stack>
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </Stack>
  )
}

export default SectionHeader
