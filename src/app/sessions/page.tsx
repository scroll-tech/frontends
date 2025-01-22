import { Stack } from "@mui/material"

import EligibleAssets from "./EligibleAssets"
import Guidance from "./Guidance"
import Header from "./Header"
import Protocols from "./Protocols"
import SignatureRequestDialog from "./SignatureRequestDialog"

const Sessions = () => {
  return (
    <>
      <Header></Header>
      <Stack
        sx={[
          {
            gap: ["2.4rem", "3.2rem"],
            maxWidth: "88.4rem",
            mx: "auto",
            mt: [0, "5.6rem"],
            mb: ["-32rem", "12rem"],
            width: ["calc(100% - 4rem)", "calc(100% - 4rem)", "auto"],

            position: ["relative", "static"],
            top: ["-38rem", 0],
          },
        ]}
      >
        <EligibleAssets></EligibleAssets>
        <Protocols></Protocols>
        <Guidance />
        <SignatureRequestDialog />
      </Stack>
    </>
  )
}

export default Sessions
