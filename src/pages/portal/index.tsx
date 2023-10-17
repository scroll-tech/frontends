import { Box, Container, Stack, Typography } from "@mui/material"

import { L2_NAME } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { networkType } from "@/utils"

import SendFeedback from "./SendFeedback"
import TestFlow from "./TestFlow"
import WalletConfig from "./WalletConfig"

const Portal = () => {
  const { isMobile } = useCheckViewport()
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: ["6.8rem", "13.8rem"] }}>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: 1, fontWeight: 600 }}>{L2_NAME}</Typography>
        <Typography sx={{ fontSize: ["2rem", "2.6rem"], mt: ["2rem", "1.4rem"] }}>Get started with our {networkType} now!</Typography>
      </Box>
      <Stack
        direction="column"
        gap={isMobile ? "4rem" : "6rem"}
        alignItems="center"
        sx={{
          mt: ["8rem", "12rem"],
          pb: ["12rem", "14rem"],
          maxWidth: ["100%", "1036px"],
          px: "0",
          margin: "0 auto",
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <WalletConfig></WalletConfig>
        <TestFlow></TestFlow>
        <SendFeedback></SendFeedback>
      </Stack>
    </Container>
  )
}

export default Portal
