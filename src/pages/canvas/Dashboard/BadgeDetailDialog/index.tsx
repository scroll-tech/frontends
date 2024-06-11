import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import { mintBadge } from "@/services/canvasService"
import useCanvasStore, { BadgeDetailDialogType } from "@/stores/canvasStore"
import { generateShareTwitterURL, getBadgeImgURL, requireEnv } from "@/utils"

import { badgeMap } from "../UpgradeDialog/Badges"

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  // width: "24rem",
  // height: "4.8rem",
  // fontSize: "1.8rem",
  // fontWeight: 600,
}))

const ButtonContainer = styled(forwardRef<any, any>((props, ref) => <Box {...props} ref={ref} />))(({ theme }) => ({
  display: "flex",
  gap: "1.6rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "2.4rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    position: "fixed",
    bottom: 0,
    "& > div": {
      width: "100%",
    },
    "& .viewBtn": {
      gridColumn: "span 2",
    },
    "& .mintBtn": {
      gridColumn: "span 2",
    },
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
    isBadgeMinting,
    changeIsBadgeMinting,
    pickMintableBadges,
  } = useCanvasStore()
  const navigate = useNavigate()
  const alertWarning = useSnackbar()
  const { isMobile } = useCheckViewport()
  const [actionHeight, setActionHeight] = useState("auto")
  const actionsRef = useRef()

  useEffect(() => {
    if (badgeDetailDialogVisible !== BadgeDetailDialogType.HIDDEN && actionsRef?.current) {
      setActionHeight((actionsRef.current as HTMLDivElement).getBoundingClientRect().height + "px")
    }
  }, [badgeDetailDialogVisible])

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeUpgradeDialog(false)
  }

  const handleMint = async () => {
    changeIsBadgeMinting(selectedBadge.badgeContract, true)
    try {
      const result = await mintBadge(provider, walletCurrentAddress, selectedBadge)
      // const result: any = await testAsyncFunc("0x11cfb299dda2ae8b1fccf9a055394de9a7f953e8b8f115295dc0f2325e8b2130")
      if (result) {
        await queryVisibleBadges(provider, walletCurrentAddress)
        await pickMintableBadges(provider, walletCurrentAddress, false)
        alertWarning(
          <>
            {selectedBadge.name} minted successfully!<br></br>
            <Link underline="always" sx={{ color: "inherit", fontSize: "inherit" }} href={`/scroll-canvas/badge/${result}`}>
              View badge details
            </Link>
          </>,
          "success",
        )
        changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
      }
    } catch (e) {
      alertWarning(e.message)
    } finally {
      changeIsBadgeMinting(selectedBadge.badgeContract, false)
    }
  }

  const handleViewCanvas = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    navigate("/scroll-canvas")
  }

  // const handleViewEAS = () => {
  //   changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
  //   navigate("/scroll-canvas/eas")
  // }

  const handleViewBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-canvas/badge/${selectedBadge.id}`)
  }

  const handleViewBadgeContract = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeUpgradeDialog(false)
    navigate(`/scroll-canvas/badge-contract/${selectedBadge.badgeContract}`)
  }

  const handleBack = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    // changeUpgradeDialog(true)
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
      sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
      disablePortal={isMobile}
      open={badgeDetailDialogVisible !== BadgeDetailDialogType.HIDDEN}
      allowBack={[BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible)}
      onBack={handleBack}
      onClose={handleClose}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent={isMobile ? "flex-start" : "center"}
        sx={{ width: ["100%", "57.6rem"], height: [`calc(100% - ${actionHeight})`, "auto", "auto", "64.2rem"] }}
      >
        <Img
          alt="img"
          src={getBadgeImgURL(selectedBadge.image)}
          placeholder="/imgs/canvas/badgePlaceholder.svg"
          style={{
            width: isMobile ? "12rem" : "20rem",
            height: isMobile ? "12rem" : "20rem",
            marginBottom: isMobile ? "1.6rem" : "3.2rem",
            borderRadius: "0.8rem",
          }}
        />
        {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK, BadgeDetailDialogType.VIEW, BadgeDetailDialogType.NO_PROFILE].includes(
          badgeDetailDialogVisible,
        ) && (
          <>
            <Typography
              sx={{
                fontSize: ["2rem", "3.2rem"],
                fontWeight: 600,
                lineHeight: ["3.2rem", "4.8rem"],
                marginBottom: "0.8rem",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {selectedBadge.name}
            </Typography>
            <Typography
              sx={[
                {
                  fontSize: ["1.6rem", "1.8rem"],
                  lineHeight: ["2.4rem", "2.8rem"],
                  color: "primary.contrastText",
                  textAlign: ["left", "center"],
                  marginBottom: "1.2rem",
                },
                theme => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "-webkit-box",
                    width: "100%",
                    "-webkit-box-orient": "vertical",
                    "-webkit-line-clamp": "4",
                    overflow: "hidden",
                  },
                }),
              ]}
            >
              {selectedBadge.description}
            </Typography>
            {/* TODO: how to get badge contract address from a user's badge */}
            <Stack direction="row" alignItems="center" gap="0.8rem" mb={isMobile ? "0.8rem" : "3.2rem"}>
              <Avatar variant="square" src={badgeIssuer.logo} sx={{ width: "3.2rem", height: "3.2rem", borderRadius: "0.4rem" }}></Avatar>
              <Typography sx={{ fontSize: ["1.8rem", "2rem"], fontWeight: 600, color: "primary.contrastText" }}>{badgeIssuer.name}</Typography>
            </Stack>
          </>
        )}

        {[BadgeDetailDialogType.NO_PROFILE].includes(badgeDetailDialogVisible) && (
          <Stack direction="row" gap="0.8rem" alignItems="center" sx={{ mb: [0, "2.4rem"], px: [0, "4rem"] }}>
            <InfoOutlinedIcon sx={{ color: "#FAD880", fontSize: ["1.8rem", "2.4rem"] }} />
            <Typography sx={{ color: "#FAD880", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"] }}>
              You need a Scroll Canvas in order to mint your {selectedBadge.name} Badge.
            </Typography>
          </Stack>
        )}

        <ButtonContainer ref={actionsRef}>
          {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton className="mintBtn" loading={isBadgeMinting.get(selectedBadge.badgeContract)} color="primary" onClick={handleMint}>
              {isBadgeMinting.get(selectedBadge.badgeContract) ? "Minting" : "Mint badge"}
            </StyledScrollButton>
          )}

          {/* {[BadgeDetailDialogType.UPGRADE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton color="primary" onClick={handleViewEAS}>
              View on EAS
            </StyledScrollButton>
          )} */}

          {[BadgeDetailDialogType.NO_PROFILE].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton className="viewBtn" color="primary" target="_blank" onClick={handleViewCanvas}>
              View Scroll Canvas
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton className="detailBtn" width="24rem" color="tertiary" onClick={handleViewBadgeContract}>
              View details
            </StyledScrollButton>
          )}
          {[BadgeDetailDialogType.VIEW].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton className="detailBtn" width="24rem" color="tertiary" onClick={handleViewBadge}>
              View details
            </StyledScrollButton>
          )}

          {[BadgeDetailDialogType.VIEW].includes(badgeDetailDialogVisible) && (
            <Link external href={shareBadgeURL} className="shareBtn">
              <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
            </Link>
          )}
          {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <Link external href={shareBadgeContractURL} className="shareBtn">
              <SvgIcon sx={{ width: "3.2rem", height: "3.2rem", color: "primary.contrastText" }} component={ShareSvg} inheritViewBox></SvgIcon>
            </Link>
          )}
        </ButtonContainer>
      </Stack>
    </Dialog>
  )
}

export default BadgeDetailDialog
