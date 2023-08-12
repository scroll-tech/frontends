// import createCache from "@emotion/cache"
import { Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import AppProvider from "@/contexts/AppContextProvider"
import useBridgeStore from "@/stores/bridgeStore"

import ConnectorAndHistory from "./ConnectorAndHistory"
import FAQsLink from "./FAQ/link"
import Send from "./Send"
import TxHistory from "./TxHistory"

const Bridge = () => {
  const { mode } = useBridgeStore()
  return (
    <AppProvider>
      <SectionWrapper
        maxWidth="74.8rem"
        sx={{ pt: "8.4rem", height: "calc(100vh - 6.5rem)", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: "4.8rem", fontWeight: 600 }}>Bridge into Scroll</Typography>
        <ConnectorAndHistory sx={{ mt: "4rem", mb: "3rem" }}></ConnectorAndHistory>
        {mode === "Transaction" ? <Send></Send> : <TxHistory></TxHistory>}
        <FAQsLink />
      </SectionWrapper>
    </AppProvider>
  )
}

export default Bridge
