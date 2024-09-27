import { useMemo } from "react"

import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ArrowlSvg } from "@/assets/svgs/canvas-perks/arrow.svg"
import { ReactComponent as ExternalSvg } from "@/assets/svgs/canvas-perks/external.svg"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ScrollButton from "@/pages/canvas/components/Button"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasStore, { EnsSubdomainDialogType } from "@/stores/canvasStore"
import usePerkStore from "@/stores/perksStore"
import { truncateAddress } from "@/utils"

import ConfettiComponent from "./components/ConfettiComponent"

const ENSSubdomainDialog = () => {
  const { username, changeEnsSubdomainDialogVisible, ensSubdomainDialogVisible, changeProfileDialog } = useCanvasStore()
  const { walletCurrentAddress } = useRainbowContext()
  const { perks } = usePerkStore()

  const perk = useMemo(() => {
    return perks.find(perk => perk.id === "claim-ens-subdomain")!
  }, [perks])

  const status = useMemo(() => {
    if (!perk) {
      return {
        badges: [],
      }
    }
    const data = perk.requires.map(require => require())
    return {
      badges: data.map(item => item.badge),
    }
  }, [perk])

  const handleClose = () => {
    changeEnsSubdomainDialogVisible(EnsSubdomainDialogType.HIDDEN)
  }

  const handleChangeName = () => {
    changeProfileDialog(true)
  }

  const handleConfirm = () => {
    changeEnsSubdomainDialogVisible(EnsSubdomainDialogType.SUCCESS)
  }

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          height: "76rem",
          width: "64rem",
        },
      }}
      onClose={handleClose}
      open={ensSubdomainDialogVisible}
    >
      <Stack maxWidth="57.6rem" py={["1.6rem"]} justifyContent="space-between" height="100%" textAlign={"center"}>
        <Box>
          <Typography
            sx={{
              fontSize: ["3.2rem"],
              lineHeight: ["4.8rem"],
              fontWeight: 600,
              color: "primary.contrastText",
              mb: ["0.8rem"],
            }}
          >
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.CLAIM && "Claim your ENS subdomain"}
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.CONFIRM && "Confirm your name"}
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.SUCCESS && "Congrats!"}
          </Typography>
          <Typography sx={{ fontSize: ["1.8rem"], lineHeight: ["2.8rem"], color: "primary.contrastText" }}>
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.CLAIM &&
              `Make your ${truncateAddress(
                walletCurrentAddress as string,
              )} address readable for free! This is your personalized address that people can send crypto to.`}
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.CONFIRM && "Your username needs to match your current canvas name."}
            {ensSubdomainDialogVisible === EnsSubdomainDialogType.SUCCESS && username + ".scroll.eth is ready to receive crypto."}
          </Typography>
        </Box>

        {ensSubdomainDialogVisible === EnsSubdomainDialogType.CLAIM && (
          <Box>
            <Box
              sx={{
                py: ["3.2rem"],
                background: "#101010",
                borderRadius: "2rem",
                mb: ["4rem"],
              }}
            >
              <Typography
                sx={{
                  fontSize: ["3.2rem"],
                  color: "rgba(255, 255, 255, 0.40)",
                  mb: ["0.8rem"],
                  fontWeight: 600,
                  position: "relative",
                }}
              >
                {truncateAddress(walletCurrentAddress as string)}
                <SvgIcon component={ArrowlSvg} sx={{ fontSize: "9.3rem", position: "absolute" }} inheritViewBox />
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  background: "rgba(255, 255, 255, 0.10)",
                  fontSize: ["4rem"],
                  lineHeight: ["4.8rem"],
                  fontWeight: 600,
                  margin: "0 auto",
                  mb: ["0.8rem"],
                  px: ["4.8rem"],
                  py: ["1.6rem"],
                  borderRadius: "4rem",
                  width: "fit-content",
                }}
              >
                {username}.scroll.eth
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: ["1.8rem"],
                  color: "#fff",
                  mb: ["1.6rem"],
                }}
              >
                Collect Ethereum year badge and any three badges to qualify.{" "}
              </Typography>
              <Stack direction="row" justifyContent="center" gap={"2.4rem"}>
                {status.badges.map((badge, index) => {
                  return <img alt="" src={badge} style={{ width: "10rem", height: "10rem" }} key={index} />
                })}
              </Stack>
            </Box>
          </Box>
        )}

        {ensSubdomainDialogVisible === EnsSubdomainDialogType.CONFIRM && (
          <Box>
            <Box sx={{ minHeight: "20rem" }}>
              <Typography
                sx={{
                  color: "#90F7EB",
                  fontSize: ["4.8rem"],
                  lineHeight: ["5.6rem"],
                  fontWeight: 600,
                  mb: ["2.4rem"],
                }}
              >
                {username}.scroll.eth
              </Typography>

              <Link
                sx={{
                  fontSize: ["1.8rem"],
                  color: "#fff",
                  fontWeight: 600,
                  lineHeight: ["2.8rem"],
                  borderRadius: "2.2rem",
                  background: "rgba(255, 255, 255, 0.10)",
                  padding: "8px 32px",
                  width: "fit-content",
                  margin: "0 auto",
                }}
                target="_blank"
                href={`https://app.ens.domains/name/${username}.scroll.eth`}
              >
                {truncateAddress(walletCurrentAddress as string)}
                <SvgIcon
                  sx={{
                    fontSize: "2.4rem",
                    ml: "0.8rem",
                  }}
                  component={ExternalSvg}
                  inheritViewBox
                ></SvgIcon>
              </Link>
            </Box>
          </Box>
        )}

        {ensSubdomainDialogVisible === EnsSubdomainDialogType.SUCCESS && (
          <Box>
            <Typography
              sx={{
                color: "#90F7EB",
                fontSize: ["4.8rem"],
                lineHeight: ["5.6rem"],
                fontWeight: 600,
                mb: ["2.4rem"],
                background: "linear-gradient(90deg, #FF684B 0%, #FCE595 51%, #4BFFE7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                width: "fit-content",
                margin: "0 auto",
              }}
            >
              {username}.scroll.eth
            </Typography>
          </Box>
        )}

        {ensSubdomainDialogVisible === EnsSubdomainDialogType.CLAIM && perk.isClaimed && (
          <Button
            color="primary"
            sx={{
              fontWeight: 600,
              "&.Mui-disabled": {
                backgroundColor: "rgba(144, 248, 234, 0.20)",
                color: "#90F8EA",
                cursor: "not-allowed",
                opacity: 1,
                borderRadius: "2.8rem",
              },
            }}
            variant="contained"
            onClick={() => changeEnsSubdomainDialogVisible(EnsSubdomainDialogType.CONFIRM)}
            disabled
          >
            This perk has been claimed
          </Button>
        )}

        {ensSubdomainDialogVisible === EnsSubdomainDialogType.CLAIM && !perk.isClaimed && (
          <Button
            color="primary"
            sx={{
              fontWeight: 600,
              "&.Mui-disabled": {
                backgroundColor: "#5b362d",
                color: "#5e5e5e",
                cursor: "not-allowed",
                opacity: 1,
              },
            }}
            variant="contained"
            onClick={() => changeEnsSubdomainDialogVisible(EnsSubdomainDialogType.CONFIRM)}
            disabled={!perk?.areAllValid}
          >
            Claim Now
          </Button>
        )}
        {ensSubdomainDialogVisible === EnsSubdomainDialogType.CONFIRM && (
          <Stack
            direction="row"
            justifyContent="center"
            gap="1.6rem"
            sx={theme => ({
              [theme.breakpoints.down("sm")]: {
                position: "fixed",
                bottom: 0,
                width: "100%",
                p: "2.4rem 2rem",
                "& > *": {
                  width: "50%",
                },
              },
            })}
          >
            <ScrollButton color="secondary" sx={{ borderColor: "#fff !important", flex: 1 }} fullWidth onClick={handleChangeName}>
              Change name
            </ScrollButton>
            <ScrollButton color="primary" sx={{ flex: 1 }} onClick={handleConfirm} variant="contained">
              Confirm
            </ScrollButton>
          </Stack>
        )}
        {ensSubdomainDialogVisible === EnsSubdomainDialogType.SUCCESS && (
          <Button color="primary" variant="contained" onClick={handleClose}>
            Done
          </Button>
        )}
        {ensSubdomainDialogVisible === EnsSubdomainDialogType.SUCCESS && <ConfettiComponent />}
      </Stack>
    </Dialog>
  )
}

export default ENSSubdomainDialog
