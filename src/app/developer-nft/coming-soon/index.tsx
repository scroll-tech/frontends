import { Stack } from "@mui/material"

import Alert from "@/components/Alert/NFTAlert"
import GlobalComponents from "@/components/GlobalComponents"
import SectionWrapper from "@/components/SectionWrapper"
import { MintableDate, SCROLL_ORIGINS_NFT } from "@/constants"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import useNFTStore from "@/stores/nftStore"
import { formatDate } from "@/utils"

import CheckElegbility from "./CheckElegbility"
import Header from "./Header"
import Purpose from "./Purpose"
import Stage from "./Stage"
import Stepper from "./Stepper"

const ComingSoon = () => {
  const { phrase } = useNFTStore()

  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      <SectionWrapper
        dark
        maxWidth="108rem"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: ["8rem", "16rem"],
          pt: 0,
          "& .MuiTypography-root": { color: theme => theme.palette.primary.contrastText },
        }}
      >
        <Header></Header>
        {phrase === "in-progress" && <Stepper></Stepper>}
        <Purpose></Purpose>
        <Stage></Stage>
        {phrase === "in-progress" ? (
          <CheckElegbility></CheckElegbility>
        ) : (
          <Stack sx={{ mt: ["3.2rem", "4.8rem"] }}>
            <Alert>
              {SCROLL_ORIGINS_NFT} will be claimable on {formatDate(MintableDate)}.
            </Alert>
          </Stack>
        )}
      </SectionWrapper>
    </BridgeContextProvider>
  )
}

export default ComingSoon
