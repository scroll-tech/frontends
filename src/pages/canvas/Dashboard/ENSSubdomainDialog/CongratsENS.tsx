import { useQueryClient } from "@tanstack/react-query"

import { Box, Stack, Typography } from "@mui/material"

import CongratCircle1MobileSvg from "@/assets/svgs/canvas-perks/congrat-circle-1-mobile.svg"
import CongratCircle1Svg from "@/assets/svgs/canvas-perks/congrat-circle-1.svg"
import CongratCircle2MobileSvg from "@/assets/svgs/canvas-perks/congrat-circle-2-mobile.svg"
import CongratCircle2Svg from "@/assets/svgs/canvas-perks/congrat-circle-2.svg"
import CongratCircle3MobileSvg from "@/assets/svgs/canvas-perks/congrat-circle-3-mobile.svg"
import CongratCircle3Svg from "@/assets/svgs/canvas-perks/congrat-circle-3.svg"
import CongratCircle4MobileSvg from "@/assets/svgs/canvas-perks/congrat-circle-4-mobile.svg"
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
          fontSize: ["2rem", "3.2rem"],
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
          filter: ["blur(100px) opacity(0.8)", "blur(100px) opacity(0.6)"],
          background: [
            `url(${CongratCircle1MobileSvg}) top left / 47% no-repeat, url(${CongratCircle2MobileSvg}) top left 10% / 65% no-repeat, url(${CongratCircle3MobileSvg}) top 40% right 20px / 50% no-repeat, url(${CongratCircle4MobileSvg}) top right / 30% no-repeat`,
            `url(${CongratCircle1Svg}) top left / 424px no-repeat, url(${CongratCircle2Svg}) top left 20% / 292px no-repeat, url(${CongratCircle3Svg}) top 30% right / 325px no-repeat`,
          ],
        }}
      ></Box>
    </>
  )
}

export default CongratsENS
