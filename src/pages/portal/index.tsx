import { isMobileOnly } from "react-device-detect"

import { Box, Stack, Typography } from "@mui/material"

import { NETWORKS } from "@/constants"

import SendFeedback from "./SendFeedback"
import TestFlow from "./TestFlow"
import WalletConfig from "./WalletConfig"

const Portal = () => {
  return (
    <>
      <Box sx={{ textAlign: "center", mt: "13.8rem" }}>
        <Typography sx={{ fontSize: ["4rem", "7.8rem"], fontWeight: 600 }}>{NETWORKS[1].name}</Typography>
        <Typography sx={{ fontSize: ["2rem", "2.6rem"], mt: "1rem" }}>Get started with our testnet now!</Typography>
      </Box>
      <Stack
        direction="column"
        gap={isMobileOnly ? "4rem" : "6rem"}
        alignItems="center"
        sx={{ mt: ["7rem", "12rem"], mb: ["5.6rem", "7.2rem"], maxWidth: ["100%", "1036px"], px: ["2rem", 0], margin: "0 auto" }}
      >
        <WalletConfig></WalletConfig>
        <TestFlow></TestFlow>
        <SendFeedback></SendFeedback>
      </Stack>
    </>
  )
}

export default Portal
