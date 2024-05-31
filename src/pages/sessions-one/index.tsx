import { Container, Stack } from "@mui/material"

import GlobalComponents from "@/components/GlobalComponents"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"

// import useCheckViewport from "@/hooks/useCheckViewport"
import AnchorNavigation from "./AnchorNavigation"
import Guidance from "./Guidance"
import Header from "./Header"
import SessionOneMarks from "./SessionOneMarks"
import SessionZeroMarks from "./SessionZeroMarks"
import SignatureRequestDialog from "./SignatureRequestDialog"
import TotalMarks from "./TotalMarks"

const Seesions = () => {
  // const { isPortrait } = useCheckViewport()
  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      <Header></Header>
      <Container
        sx={{ maxWidth: "1272px !important", display: "grid", gridTemplateColumns: "max-content 1fr", gap: "2.8rem", justifyContent: "center" }}
      >
        <AnchorNavigation></AnchorNavigation>
        <Stack gap="3rem" sx={{ mb: "6rem", maxWidth: "88.4rem" }}>
          <TotalMarks></TotalMarks>
          <SessionOneMarks></SessionOneMarks>
          <SessionZeroMarks></SessionZeroMarks>
          <Guidance />
          <SignatureRequestDialog />
        </Stack>
      </Container>
    </BridgeContextProvider>
  )
}

export default Seesions
