import GlobalComponents from "@/components/GlobalComponents"
import SectionWrapper from "@/components/SectionWrapper"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import useNFTStore from "@/stores/nftStore"

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
        <CheckElegbility></CheckElegbility>
      </SectionWrapper>
    </BridgeContextProvider>
  )
}

export default ComingSoon
