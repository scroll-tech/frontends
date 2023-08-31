// import createCache from "@emotion/cache"
import { useEffect } from "react"
import { isMobileOnly } from "react-device-detect"

import { Stack, Typography } from "@mui/material"

import GlobalWarning from "@/components/GlobalWarning"
import SectionWrapper from "@/components/SectionWrapper"
import { NETWORKS } from "@/constants"
import AppProvider from "@/contexts/AppContextProvider"
import { PriceFeeProvider } from "@/contexts/PriceFeeProvider"
import useBridgeStore from "@/stores/bridgeStore"

import ConnectorAndHistory from "./ConnectorAndHistory"
import NetworkIndicator from "./ConnectorAndHistory/NetworkIndicator"
import FAQsLink from "./FAQ/link"
import Send from "./Send"
import TxHistory from "./TxHistory"

const Bridge = () => {
  const { mode, txType, changeFromNetwork, changeToNetwork } = useBridgeStore()

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
            height: "calc(100vh - 6.5rem)",
            minHeight: "86rem",
            display: "flex",
            flexDirection: "column",
            alignItems: ["flex-start", "center"],
            maxWidth: ["100% !important"],
          }}
        >
          <Stack direction="row" sx={{ width: "100%" }} spacing="4px" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: ["4rem", "4.8rem"], fontWeight: 600, textAlign: "center", width: "100%", whiteSpace: "nowrap" }}>
              Bridge into Scroll
            </Typography>
            {isMobileOnly && <NetworkIndicator></NetworkIndicator>}
          </Stack>

          <ConnectorAndHistory
            sx={{
              mt: "4rem",
              mb: ["2rem", "3rem"],
              width: ["100%", "51.6rem"],
              "& *": {
                fontFamily: "var(--developer-page-font-family) !important",
              },
            }}
          ></ConnectorAndHistory>
          {mode === "Transaction" ? <Send></Send> : <TxHistory></TxHistory>}
          <FAQsLink />
        </SectionWrapper>
      </PriceFeeProvider>
    </AppProvider>
  )
}

export default Bridge
