import { Stack } from "@mui/material"

import BridgeContextProvider from "@/contexts/BridgeContextProvider"

import ComingSoon from "./ComingSoon"
import Guidance from "./Guidance"
import Header from "./Header"
import BridgeMaks from "./SessionZeroMarks"
import SignatureRequestDialog from "./SignatureRequestDialog"
import TotalMarks from "./TotalMarks"

const Chronicle = () => {
  return (
    <BridgeContextProvider>
      <Header></Header>
      <Stack gap="3rem" sx={{ mb: "6rem", position: "relative" }}>
        <TotalMarks></TotalMarks>
        <BridgeMaks></BridgeMaks>
        <ComingSoon></ComingSoon>
        <Guidance />
        <SignatureRequestDialog />
      </Stack>
    </BridgeContextProvider>
  )
}

export default Chronicle
