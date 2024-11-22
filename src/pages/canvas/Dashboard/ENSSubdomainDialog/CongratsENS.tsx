import { useQueryClient } from "@tanstack/react-query"

import { Box, Stack, Typography } from "@mui/material"

import CongratCircle1Svg from "@/assets/svgs/canvas-perks/congrat-circle-1.svg"
import CongratCircle2Svg from "@/assets/svgs/canvas-perks/congrat-circle-2.svg"
import CongratCircle3Svg from "@/assets/svgs/canvas-perks/congrat-circle-3.svg"
import ScrollLoadingButton from "@/components/LoadingButton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasProfileStore, { EnsSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"

import ENSSubdomain from "../BadgeWall/Name/ENSSubdomain"
import ConfettiComponent from "./components/ConfettiComponent"

const CongratsENS = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { changeEnsSubdomainDialogType } = useCanvasProfileStore()

  const queryClient = useQueryClient()

  const ensSubdomain = queryClient.getQueryData(["ensSubdomain", walletCurrentAddress]) as string

  const handleCloseDialog = () => {
    changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.HIDDEN)
  }

  return (
    <>
      <Typography
        sx={{
          fontSize: ["3.2rem"],
          lineHeight: ["4.8rem"],
          fontWeight: 600,
          color: "primary.contrastText",
          mb: ["0.8rem"],
        }}
      >
        Congrats!
      </Typography>
      <Typography sx={{ fontSize: ["1.8rem"], lineHeight: ["2.8rem"], color: "primary.contrastText" }}>
        {ensSubdomain} is ready to receive crypto.
      </Typography>

      <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
        <ENSSubdomain sx={{ fontSize: ["4.8rem"], lineHeight: ["5.6rem"] }}>{ensSubdomain}</ENSSubdomain>
      </Stack>
      <ScrollLoadingButton sx={{ borderRadius: "1rem", width: "100%", height: "5.6rem", fontSize: "2rem", mt: "6.8rem" }} onClick={handleCloseDialog}>
        Done
      </ScrollLoadingButton>
      <ConfettiComponent />
      <Box
        sx={{
          position: "absolute",
          pointerEvents: "none",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: "blur(100px) opacity(0.6)",
          background: `url(${CongratCircle1Svg}) top left / 424px no-repeat, url(${CongratCircle2Svg}) top left 20% / 292px no-repeat, url(${CongratCircle3Svg}) top 30% right / 325px no-repeat`,
        }}
      ></Box>
    </>
  )
}

export default CongratsENS
