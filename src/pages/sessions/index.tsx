import { Stack } from "@mui/material"

import BridgeContextProvider from "@/contexts/BridgeContextProvider"

import ComingSoon from "./ComingSoon"
import Guidance from "./Guidance"
import Header from "./Header"
import BridgeMaks from "./SessionZeroMarks"
import SignatureRequestDialog from "./SignatureRequestDialog"
import TotalMasks from "./TotalMasks"

const Chronicle = () => {
  return (
    <BridgeContextProvider>
      <Header></Header>
      <Stack gap="3rem" sx={{ mb: "6rem" }}>
        <TotalMasks></TotalMasks>
        <BridgeMaks></BridgeMaks>
        <ComingSoon></ComingSoon>
        <Guidance />
        <SignatureRequestDialog />
      </Stack>
    </BridgeContextProvider>
  )
}

export default Chronicle
