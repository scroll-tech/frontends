import { useMemo } from "react"
import Img from "react-cool-img"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowlSvg } from "@/assets/svgs/canvas-perks/arrow.svg"
import LoadingButton from "@/components/LoadingButton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasProfileStore, { EnsSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import usePerkStore from "@/stores/perksStore"
import { truncateAddress } from "@/utils"

const ClaimENS = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { changeEnsSubdomainDialogType } = useCanvasProfileStore()

  const { perks } = usePerkStore()

  const perk = useMemo(() => {
    return perks.find(perk => perk.id === "claim-ens-subdomain")!
  }, [perks])

  console.log(perk, "perk")

  const handleGoToConfirm = () => {
    changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.CREATE_SUBDOMAIN, true)
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
        Claim your ENS subdomain
      </Typography>
      <Typography sx={{ fontSize: ["1.8rem"], lineHeight: ["2.8rem"], color: "primary.contrastText" }}>
        Make your {truncateAddress(walletCurrentAddress as string)} address readable for free! This is your personalized address that people can send
        crypto to.
      </Typography>
      <Box
        sx={{
          pt: ["3.4rem"],
          pb: ["3rem"],
          background: "#101010",
          borderRadius: "2rem",
          my: ["4rem"],
          width: "100%",
        }}
      >
        <Typography
          sx={{
            position: "relative",
            fontSize: ["3.2rem"],
            lineHeight: ["4.8rem"],
            color: "rgba(255, 255, 255, 0.40)",
            mb: ["0.8rem"],
            fontWeight: 600,
            fontFamily: "var(--developer-page-font-family)",
          }}
        >
          {truncateAddress(walletCurrentAddress as string)}
          <SvgIcon component={ArrowlSvg} sx={{ fontSize: "9.8rem", position: "absolute", left: "calc(50% + 12rem)", top: "0.4rem" }} inheritViewBox />
        </Typography>
        <Box sx={{ background: "rgba(255, 255, 255, 0.10)", borderRadius: "4rem", width: "fit-content", margin: "0 auto", p: ["1.6rem 2.4rem"] }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: ["4rem"],
              lineHeight: ["4rem"],
              fontWeight: 600,
              transform: "translateY(-0.05em)",
            }}
          >
            <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", color: "#90F7EB" }}>
              name
            </Typography>
            .scroll.eth
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: ["1.8rem"],
          color: "#fff",
          mb: ["1.6rem"],
        }}
      >
        Collect SCR holding badge to qualify.
      </Typography>
      <Stack direction="row" gap="2.4rem" justifyContent="center">
        {perk.imageURL.map((imageURL, index) => (
          <Img src={imageURL} alt="" style={{ width: "10rem", height: "10rem" }} />
        ))}
      </Stack>
      {perk.claimed ? (
        <Box
          sx={{
            backgroundColor: "rgba(144, 248, 234, 0.20)",

            borderRadius: "2.8rem",
            width: "100%",
            mt: "6.4rem",
          }}
        >
          <Typography sx={{ fontSize: "2rem", height: "5.6rem", lineHeight: "5.6rem", fontWeight: 600, color: "#90F8EA", cursor: "not-allowed" }}>
            This perk has been claimed
          </Typography>
        </Box>
      ) : (
        <LoadingButton
          sx={{
            borderRadius: "1rem",
            width: "100%",
            height: "5.6rem",
            fontSize: "2rem",
            mt: "6.4rem",
          }}
          disabled={!perk.claimable}
          onClick={handleGoToConfirm}
        >
          Claim Now
        </LoadingButton>
      )}
    </>
  )
}

export default ClaimENS
