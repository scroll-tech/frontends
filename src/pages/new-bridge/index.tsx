// import createCache from "@emotion/cache"
import { useEffect } from "react"

import { Stack, Typography } from "@mui/material"

import GlobalWarning from "@/components/GlobalWarning"
import SectionWrapper from "@/components/SectionWrapper"
import { NETWORKS } from "@/constants"
import AppProvider from "@/contexts/AppContextProvider"
import { PriceFeeProvider } from "@/contexts/PriceFeeProvider"
import useBridgeStore from "@/stores/bridgeStore"

import FAQsLink from "./FAQ/link"
import Send from "./Send"
import TxHistoryDialog from "./TxHistoryDialog"

const Bridge = () => {
  const { txType, changeFromNetwork, changeToNetwork } = useBridgeStore()

  useEffect(() => {
    if (txType === "Deposit") {
      changeFromNetwork(NETWORKS[0])
      changeToNetwork(NETWORKS[1])
    } else {
      changeFromNetwork(NETWORKS[1])
      changeToNetwork(NETWORKS[0])
    }
  }, [txType])

  return (
    <AppProvider>
      <PriceFeeProvider>
        <GlobalWarning></GlobalWarning>
        <SectionWrapper
          sx={{
            pt: "8.4rem",
            width: "fit-content",
            height: "calc(100vh - 69.2rem)",
            minHeight: "86rem",
            display: "flex",
            flexDirection: "column",
            alignItems: ["flex-start", "center"],
            maxWidth: ["100% !important"],
          }}
        >
          <Stack direction="row" sx={{ width: "100%", mb: ["3rem", "5rem"] }} spacing="4px" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: ["4rem", "4.8rem"], fontWeight: 600, textAlign: "center", width: "100%", whiteSpace: "nowrap" }}>
              Bridge into Scroll
            </Typography>
          </Stack>
          <Send></Send>
          <TxHistoryDialog></TxHistoryDialog>
          <FAQsLink />
        </SectionWrapper>
      </PriceFeeProvider>
    </AppProvider>
  )
}

export default Bridge
