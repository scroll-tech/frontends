import { useMemo } from "react"
import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import { getBadgeMetadata, mintBadge } from "@/services/canvasService"
import useCanvasStore, { BadgeDetailDialogTpye } from "@/stores/canvasStore"
import { generateShareTwitterURL, getBadgeImgURL, requireEnv } from "@/utils"

import { badgeMap } from "../UpgradeDialog/Badges"

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  // width: "24rem",
  // height: "4.8rem",
  // fontSize: "1.8rem",
  fontWeight: 600,
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1.6rem",
  alignItems: "center",
  // marginTop: "3.2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

// const UpgradedBox = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   display: "flex",
//   backgroundColor: "#FF6F43",
//   height: "4.8rem",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "#fff",
//   fontSize: "1.6rem",
//   fontWeight: 600,
// }))

// const UpgradedButton = styled(Button)(({ theme }) => ({
//   borderRadius: "0.8rem",
//   fontSize: "1.6rem",
//   fontWeight: 600,
//   lineHeight: "2.4rem",
//   height: "3.2rem",
//   width: "12.4rem",
//   border: "1px solid #Fff",
//   padding: "0",
//   marginLeft: "1.6rem",
// }))

const BadgeDetailDialog = () => {
  const { walletCurrentAddress, provider } = useRainbowContext()
  const {
    badgeDetailDialogVisible,
    changeBadgeDetailDialog,
    selectedBadge,
    changeUpgradeDialog,
    queryVisibleBadges,
    changeSelectedBadge,
    isBadgeMinting,
    changeIsBadgeMinting,
  } = useCanvasStore()
  const navigate = useNavigate()
  const alertWarning = useSnackbar()

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
  }

  const handleMint = async () => {
    changeIsBadgeMinting(selectedBadge.badgeContract, true)
    try {
      const result = await mintBadge(provider, walletCurrentAddress, selectedBadge)
      if (result) {
        const { image } = await getBadgeMetadata(provider, selectedBadge.badgeContract, result)
        changeSelectedBadge({ ...selectedBadge, id: result, image })
        changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
        queryVisibleBadges(provider, walletCurrentAddress)
      }
    } catch (e) {
      alertWarning("Failed to mint badge")
    } finally {
      changeIsBadgeMinting(selectedBadge.badgeContract, false)
    }
  }

  const handleViewCanvas = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-canvas")
  }

  const handleViewEAS = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-canvas/eas")
  }

  const handleViewBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-canvas/badge/${selectedBadge.id}`)
  }

  const handleViewBadgeContract = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-canvas/badge-contract/${selectedBadge.badgeContract}`)
  }

  const handleBack = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(true)
  }

  const badgeIssuer = useMemo(() => badgeMap[selectedBadge.badgeContract]?.issuer || {}, [selectedBadge])

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas/badge/${selectedBadge.id}`
    return generateShareTwitterURL(viewURL, `Here is my badge ${selectedBadge.name}`)
  }, [selectedBadge])

  const shareBadgeContractURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas/badge-contract/${selectedBadge.badgeContract}`
    return generateShareTwitterURL(viewURL, `I found badge ${selectedBadge.name}`)
  }, [selectedBadge])

  return (
    <Dialog
      open={badgeDetailDialogVisible !== BadgeDetailDialogTpye.HIDDEN}
      allowBack={[BadgeDetailDialogTpye.MINT_WITH_BACK, BadgeDetailDialogTpye.MINTED].includes(badgeDetailDialogVisible)}
      onBack={handleBack}
      onClose={handleClose}
    >
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{ width: "57.6rem", height: "64.8rem" }}>
        <Img
          alt="img"
          src={getBadgeImgURL(selectedBadge.image)}
          placeholder="/imgs/canvas/badgePlaceholder.svg"
          style={{ width: "20rem", height: "20rem", marginBottom: "3.2rem", borderRadius: "0.8rem" }}
        />
        {[BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK, BadgeDetailDialogTpye.VIEW, BadgeDetailDialogTpye.NO_PROFILE].includes(
          badgeDetailDialogVisible,
        ) && (
          <>
            <Typography
              sx={{ fontSize: "3.2rem", fontWeight: 600, lineHeight: "4.8rem", marginBottom: "0.8rem", color: "#fff", textAlign: "center" }}
            >
              {selectedBadge.name}
            </Typography>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", color: "primary.contrastText", textAlign: "center", marginBottom: "1.2rem" }}>
              {selectedBadge.description}
            </Typography>
            {/* TODO: how to get badge contract address from a user's badge */}
            <Stack direction="row" gap="0.8rem" mb="3.2rem">
              <Avatar variant="square" src={badgeIssuer.logo} sx={{ width: "3.2rem", height: "3.2rem", borderRadius: "0.4rem" }}></Avatar>
              <Typography sx={{ fontSize: "2rem", fontWeight: 600, color: "primary.contrastText" }}>{badgeIssuer.name}</Typography>
            </Stack>
          </>
        )}

        {[BadgeDetailDialogTpye.MINTED].includes(badgeDetailDialogVisible) && (
          <Typography
            sx={{
              fontSize: "3.2rem",
              fontWeight: 600,
              lineHeight: "4.8rem",
              color: "primary.contrastText",
              marginBottom: "3.2rem",
              textAlign: "center",
            }}
          >
            You have successfully minted <br />
            {selectedBadge.name}!
          </Typography>
        )}

        {[BadgeDetailDialogTpye.NO_PROFILE].includes(badgeDetailDialogVisible) && (
          <Stack direction="row" gap="0.8rem" alignItems="center" sx={{ mb: "2.4rem", px: "4rem" }}>
            <InfoOutlinedIcon sx={{ color: "#FAD880", fontSize: "2.4rem" }} />
            <Typography sx={{ color: "#FAD880", fontSize: "1.8rem", lineHeight: "2.8rem" }}>
              You need a Scroll Canvas in order to mint your {selectedBadge.name} Badge.
            </Typography>
          </Stack>
        )}

        <ButtonContainer>
          {[BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton loading={isBadgeMinting.get(selectedBadge.badgeContract)} color="primary" onClick={handleMint}>
              {isBadgeMinting.get(selectedBadge.badgeContract) ? "Minting" : "Mint badge"}
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.UPGRADE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton color="primary" onClick={handleViewEAS}>
              View on EAS
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.MINTED, BadgeDetailDialogTpye.NO_PROFILE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton color="primary" onClick={handleViewCanvas}>
              View Scroll Canvas
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.NO_PROFILE, BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK].includes(badgeDetailDialogVisible) ? (
            <StyledScrollButton width="24rem" color="tertiary" onClick={handleViewBadgeContract}>
              View details
            </StyledScrollButton>
          ) : (
            <StyledScrollButton width="24rem" color="tertiary" onClick={handleViewBadge}>
              View details
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.VIEW, BadgeDetailDialogTpye.MINTED].includes(badgeDetailDialogVisible) && (
            <Link external href={shareBadgeURL}>
              <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
            </Link>
          )}
          {[BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <Link external href={shareBadgeContractURL}>
              <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
            </Link>
          )}
        </ButtonContainer>
      </Stack>
    </Dialog>
  )
}

export default BadgeDetailDialog
