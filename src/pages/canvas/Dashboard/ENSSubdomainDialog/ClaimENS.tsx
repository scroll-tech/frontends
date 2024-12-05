import { useMemo } from "react"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowlSvg } from "@/assets/svgs/canvas-perks/arrow.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useCanvasProfileStore, { ENSSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import usePerkStore from "@/stores/perksStore"
import { truncateAddress } from "@/utils"

import PerksBadge from "../../components/PerksBadge"
import PerksButton from "../../components/PerksButton"
import PerksClaimedLabel from "../../components/PerksClaimedLabel"

const ClaimENS = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { isMobile } = useCheckViewport()

  const { changeENSSubdomainDialogType } = useCanvasProfileStore()

  const { perks } = usePerkStore()

  const perk = useMemo(() => {
    return perks.find(perk => perk.id === "claim-ens-subdomain")!
  }, [perks])

  console.log(perk, "perk")

  const handleGoToConfirm = () => {
    changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.CREATE_SUBDOMAIN, true)
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
        Claim your ENS subdomain
      </Typography>

      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], color: "primary.contrastText" }}>
        Make your {truncateAddress(walletCurrentAddress as string)} address readable for free! This is your personalized address that people can send
        crypto to.
      </Typography>
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            pt: ["1.8rem", "3.4rem"],
            pb: ["1.6rem", "3rem"],
            background: "#101010",
            borderRadius: ["1rem", "2rem"],
            my: ["2.4rem", "4rem"],
            width: "100%",
          }}
        >
          <Typography
            sx={{
              position: "relative",
              fontSize: ["1.8rem", "3.2rem"],
              lineHeight: ["2.8rem", "4.8rem"],
              color: "rgba(255, 255, 255, 0.40)",
              mb: ["0.4rem", "0.8rem"],
              fontWeight: 600,
              fontFamily: "var(--developer-page-font-family)",
            }}
          >
            {truncateAddress(walletCurrentAddress as string)}
            <SvgIcon
              component={ArrowlSvg}
              sx={{ fontSize: ["6rem", "9.8rem"], position: "absolute", left: ["calc(50% + 7rem)", "calc(50% + 12rem)"], top: "0.4rem" }}
              inheritViewBox
            />
          </Typography>
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.10)",
              borderRadius: "4rem",
              width: "fit-content",
              margin: "0 auto",
              p: ["0.9rem 1.4rem", "1.6rem 2.4rem"],
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: ["2.2rem", "4rem"],
                lineHeight: ["2.2rem", "4rem"],
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
          Collect the following badge(s) to qualify:
        </Typography>
        <Stack direction="row" gap={["1.6rem", "2.4rem"]} justifyContent="center">
          {perk.metadata.map(({ imageURL, badgeContract, name, owned }, index) => (
            <PerksBadge
              key={badgeContract}
              imageURL={imageURL}
              badgeContract={badgeContract}
              name={name}
              gray={!owned}
              style={{ width: isMobile ? "5.6rem" : "10rem", height: isMobile ? "5.6rem" : "10rem" }}
            />
          ))}
        </Stack>
      </Box>
      {perk.claimed ? (
        <PerksClaimedLabel sx={{ mt: "6.4rem" }}></PerksClaimedLabel>
      ) : (
        <PerksButton disabled={!perk.claimable} onClick={handleGoToConfirm}>
          Claim Now
        </PerksButton>
      )}
    </>
  )
}

export default ClaimENS
