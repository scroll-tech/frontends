// import createCache from "@emotion/cache"
import { isMobileOnly } from "react-device-detect"

import { Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import AppProvider from "@/contexts/AppContextProvider"
import { PriceFeeProvider } from "@/contexts/PriceFeeProvider"
import useBridgeStore from "@/stores/bridgeStore"

import ConnectorAndHistory from "./ConnectorAndHistory"
import NetworkIndicator from "./ConnectorAndHistory/NetworkIndicator"
import FAQsLink from "./FAQ/link"
import Send from "./Send"
import TxHistory from "./TxHistory"

const Bridge = () => {
  const { mode } = useBridgeStore()
  return (
    <AppProvider>
      <PriceFeeProvider>
        <SectionWrapper
          sx={{
            pt: "8.4rem",
            width: "fit-content",
            height: "calc(100vh - 6.5rem)",
            minHeight: "86rem",
            display: "flex",
            flexDirection: "column",
            alignItems: ["flex-start", "center"],
          }}
        >
          <Stack direction="row" sx={{ width: "100%" }} justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: ["4rem", "4.8rem"], fontWeight: 600, textAlign: "center", width: "100%" }}>Bridge into Scroll</Typography>
            {isMobileOnly && <NetworkIndicator></NetworkIndicator>}
          </Stack>
          <ConnectorAndHistory sx={{ mt: "4rem", mb: ["2rem", "3rem"], width: ["100%", "51.6rem"] }}></ConnectorAndHistory>
          {mode === "Transaction" ? <Send></Send> : <TxHistory></TxHistory>}
          <FAQsLink />
        </SectionWrapper>
      </PriceFeeProvider>
    </AppProvider>
  )
}

export default Bridge
