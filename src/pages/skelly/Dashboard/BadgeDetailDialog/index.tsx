import { useMemo, useState } from "react"
import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BackSvg } from "@/assets/svgs/skelly/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { mintBadge } from "@/services/skellyService"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"
import { generateShareTwitterURL, getBadgeImgURL, requireEnv } from "@/utils"

import { badgeMap } from "../UpgradeDialog/Badges"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(16, 16, 16, 0.60)",
  "& .MuiDialog-paper": {
    backgroundColor: "#101010",
    width: "64rem",
    // height: "67.4rem",
    minHeight: "67.4rem",
    padding: "3.2rem",
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2.4rem",
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0",
}))

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  // width: "24rem",
  height: "5.4rem",
  fontSize: "2rem",
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
  const { badgeDetailDialogVisible, changeBadgeDetailDialog, selectedBadge, changeUpgradeDialog, queryVisibleBadges, changeSelectedBadge } =
    useSkellyStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
  }

  const handleMint = async () => {
    setLoading(true)

    const result = await mintBadge(provider, walletCurrentAddress, selectedBadge.nftAddress, selectedBadge.nftAbi, selectedBadge.badgeContract)
    if (result === false) {
      console.log("mintBadge failed", result)
    } else {
      changeSelectedBadge({ ...selectedBadge, id: result })
      changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
      queryVisibleBadges(provider, walletCurrentAddress)
    }
    setLoading(false)
  }

  const handleViewSkelly = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-skelly")
  }

  const handleViewEAS = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    navigate("/scroll-skelly/eas")
  }

  const handleViewBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-skelly/badge/${selectedBadge.id}`)
  }

  const handleViewBadgeContract = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-skelly/badge-contract/${selectedBadge.badgeContract}`)
  }

  const handleBack = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
    changeUpgradeDialog(true)
  }

  const badgeIssuer = useMemo(() => badgeMap[selectedBadge.badgeContract]?.issuer || {}, [selectedBadge])

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-skelly/badge/${selectedBadge.id}`
    return generateShareTwitterURL(viewURL, `Here is my badge ${selectedBadge.name}`)
  }, [selectedBadge])

  const shareBadgeContractURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-skelly/badge-contract/${selectedBadge.badgeContract}`
    return generateShareTwitterURL(viewURL, `I found badge ${selectedBadge.name}`)
  }, [selectedBadge])

  return (
    <StyledDialog onClose={handleClose} maxWidth={false} open={badgeDetailDialogVisible !== BadgeDetailDialogTpye.HIDDEN}>
      <StyledDialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            direction: "rtl",
            width: "100%",
            position: "relative",
            top: badgeDetailDialogVisible === BadgeDetailDialogTpye.UPGRADE ? "4.8rem" : 0,
          }}
        >
          <Box sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
            <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
          </Box>
          {[BadgeDetailDialogTpye.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleBack}>
              <Box component="span" sx={{ fontSize: "1.8rem", color: "#fff" }}>
                Back
              </Box>
              <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff", marginRight: "1.2rem" }} component={BackSvg} inheritViewBox></SvgIcon>
            </IconButton>
          )}
        </Box>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Img
          alt="img"
          src={getBadgeImgURL(selectedBadge.image)}
          placeholder="/imgs/skelly/badgePlaceholder.svg"
          style={{ width: "20rem", height: "20rem", marginBottom: "4rem", borderRadius: "0.8rem" }}
        />
        {[BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK, BadgeDetailDialogTpye.VIEW, BadgeDetailDialogTpye.NO_PROFILE].includes(
          badgeDetailDialogVisible,
        ) && (
          <>
            <Typography
              sx={{ fontSize: "3.2rem", fontWeight: 600, lineHeight: "0.8rem", marginBottom: "3.2rem", color: "#fff", textAlign: "center" }}
            >
              {selectedBadge.name}
            </Typography>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", color: "primary.contrastText", textAlign: "center", marginBottom: "1.2rem" }}>
              {selectedBadge.description}
            </Typography>
            {/* TODO: how to get badge contract address from a user's badge */}
            <Stack direction="row" gap="0.8rem" mb="3.2rem">
              <Avatar variant="square" src={badgeIssuer.logo} sx={{ width: "3.2rem", height: "3.2rem", borderRadius: "0.4rem" }}></Avatar>
              <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, color: "primary.contrastText" }}>{badgeIssuer.name}</Typography>
            </Stack>
          </>
        )}

        {[BadgeDetailDialogTpye.MINTED].includes(badgeDetailDialogVisible) && (
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", marginBottom: "2.4rem", textAlign: "center" }}>
            You have successfully minted <br />
            {selectedBadge.name}!
          </Typography>
        )}

        {[BadgeDetailDialogTpye.NO_PROFILE].includes(badgeDetailDialogVisible) && (
          <Typography sx={{ color: "#FAD880", fontSize: "1.8rem", mb: "3.2rem" }}>
            <InfoOutlinedIcon sx={{ fontSize: "2.4rem", marginRight: "0.8rem", verticalAlign: "middle" }} />
            You need a Scroll Skelly in order to mint your {selectedBadge.name} Badge.
          </Typography>
        )}

        <ButtonContainer>
          {[BadgeDetailDialogTpye.MINT, BadgeDetailDialogTpye.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton loading={loading} color="primary" onClick={handleMint}>
              {loading ? "Minting" : "Mint badge"}
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.UPGRADE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton color="primary" onClick={handleViewEAS}>
              View on EAS
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogTpye.MINTED, BadgeDetailDialogTpye.NO_PROFILE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton color="primary" onClick={handleViewSkelly}>
              View Scroll Skelly
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
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgeDetailDialog