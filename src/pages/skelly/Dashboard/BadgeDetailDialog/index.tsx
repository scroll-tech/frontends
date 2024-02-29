import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import ScrollButton from "@/components/Button"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"
import { getBadgeImgURL } from "@/utils"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    // background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    backgroundColor: "#101010",
    width: "64rem",
    height: "67.4rem",
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
  marginTop: "3.2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const UpgradedBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  backgroundColor: "#FF6F43",
  height: "4.8rem",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontSize: "1.6rem",
  fontWeight: 600,
}))

const UpgradedButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "3.2rem",
  width: "12.4rem",
  border: "1px solid #Fff",
  padding: "0",
  marginLeft: "1.6rem",
}))

const BadgeDetailDialog = () => {
  const { badgeDetailDialogVisible, changeBadgeDetailDialog, selectedBadge } = useSkellyStore()
  const navigate = useNavigate()

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.HIDDEN)
  }

  const handleMint = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
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
    navigate(`/scroll-skelly/badge/${selectedBadge.badgeContract}/${selectedBadge.id}`)
  }

  useEffect(() => {
    if (selectedBadge) {
      // console.log("Selected Badge:", selectedBadge)
    }
  }, [selectedBadge])

  return (
    <StyledDialog onClose={handleClose} maxWidth={false} open={badgeDetailDialogVisible !== BadgeDetailDialogTpye.HIDDEN}>
      <StyledDialogTitle>
        {badgeDetailDialogVisible === BadgeDetailDialogTpye.UPGRADE && (
          <UpgradedBox>
            UPGRADE AVAILABLE
            <UpgradedButton variant="contained" color="primary" onClick={handleMint}>
              Upgrade now
            </UpgradedButton>
          </UpgradedBox>
        )}
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
          <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
            <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
          </IconButton>
        </Box>
      </StyledDialogTitle>
      <StyledDialogContent>
        {/* <SvgIcon sx={{ width: "20rem", height: "20rem", marginBottom: "4rem"  }} component={DefaultBadgeSvg} inheritViewBox></SvgIcon> */}
        <img alt="img" src={getBadgeImgURL(selectedBadge.image)} style={{ width: "20rem", height: "20rem", marginBottom: "4rem" }} />
        {badgeDetailDialogVisible !== BadgeDetailDialogTpye.MINTED ? (
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
            <Stack direction="row" gap="0.8rem">
              <Avatar variant="square" src="/imgs/skelly/Scroll.png" sx={{ width: "3.2rem", height: "3.2rem" }}></Avatar>
              <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, color: "primary.contrastText" }}>Scroll</Typography>
            </Stack>
          </>
        ) : (
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff", marginBottom: "2.4rem", textAlign: "center" }}>
            You have successfully minted <br />
            Scroll native badge!
          </Typography>
        )}
        <ButtonContainer>
          {badgeDetailDialogVisible === BadgeDetailDialogTpye.MINT && (
            <StyledScrollButton color="primary" onClick={handleMint}>
              Mint badge
            </StyledScrollButton>
          )}

          {badgeDetailDialogVisible === BadgeDetailDialogTpye.UPGRADE && (
            <StyledScrollButton color="primary" onClick={handleViewEAS}>
              View on EAS
            </StyledScrollButton>
          )}

          {badgeDetailDialogVisible === BadgeDetailDialogTpye.MINTED && (
            <StyledScrollButton color="primary" onClick={handleViewSkelly}>
              View Scroll Skelly
            </StyledScrollButton>
          )}
          <StyledScrollButton width="24rem" color="dark" onClick={handleViewBadge}>
            View badge details
          </StyledScrollButton>
          {badgeDetailDialogVisible !== BadgeDetailDialogTpye.MINT && (
            <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "#fff" }} component={ShareSvg} inheritViewBox></SvgIcon>
          )}
        </ButtonContainer>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgeDetailDialog
