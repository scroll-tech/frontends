import { useQueryClient } from "@tanstack/react-query"

import { Box, Stack, Typography } from "@mui/material"

import CongratBgMobileSvg from "@/assets/svgs/canvas-perks/congrat-bg-mobile.svg"
import CongratBgSvg from "@/assets/svgs/canvas-perks/congrat-bg.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasProfileStore, { ENSSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"

import PerksButton from "../../components/PerksButton"
import ENSSubdomain from "../BadgeWall/Name/ENSSubdomain"
import ConfettiComponent from "./components/ConfettiComponent"

const CongratsENS = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { changeENSSubdomainDialogType } = useCanvasProfileStore()

  const queryClient = useQueryClient()

  const ensSubdomain = queryClient.getQueryData(["ensSubdomain", walletCurrentAddress]) as string

  const handleCloseDialog = () => {
    changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.HIDDEN)
  }

  return (
    <>
      <Typography
        sx={{
          fontSize: ["2rem", "2.4rem"],
          lineHeight: ["3.2rem", "4.8rem"],
          fontWeight: 600,
          color: "primary.contrastText",
          mb: ["0.8rem"],
        }}
      >
        Congrats!
      </Typography>
      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], color: "primary.contrastText" }}>
        {ensSubdomain} is ready to receive crypto.
      </Typography>

      <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
        <ENSSubdomain sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["4rem", "5.6rem"] }}>{ensSubdomain}</ENSSubdomain>
      </Stack>
      <PerksButton sx={{ mt: "6.8rem" }} onClick={handleCloseDialog}>
        Done
      </PerksButton>
      <ConfettiComponent />
      <Box
        sx={{
          position: "absolute",
          pointerEvents: "none",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: [`url(${CongratBgMobileSvg}) center / contain  no-repeat`, `url(${CongratBgSvg}) top / 100% no-repeat`],
        }}
      ></Box>
    </>
  )
}

export default CongratsENS
