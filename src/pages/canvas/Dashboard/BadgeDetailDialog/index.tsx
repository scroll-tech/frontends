import { useQuery } from "@tanstack/react-query"
import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import Img from "react-cool-img"
import { useNavigate, useParams } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Avatar, Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import ScrollButton from "@/components/Button"
import Link from "@/components/Link"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import { checkBadgeUpgradable, fetchIssuer, fetchNotionBadgeByAddr, mintBadge } from "@/services/canvasService"
import useCanvasStore, { BadgeDetailDialogType, BadgesDialogType } from "@/stores/canvasStore"
import { generateShareTwitterURL, ipfsToBrowserURL, requireEnv, sentryDebug } from "@/utils"

import BadgeDesc from "../../components/BadgeDesc"
import UpgradeAction from "./UpgradeAction"

const StyledScrollButton = styled(ScrollButton)(({ theme }) => ({
  // width: "24rem",
  // height: "4.8rem",
  // fontSize: "1.8rem",
  // fontWeight: 600,
}))

const ButtonContainer = styled(forwardRef<any, any>((props, ref) => <Box {...props} ref={ref} />))(({ theme }) => ({
  position: "relative",
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
    "& .tip": {
      gridColumn: "span 2",
    },
  },
}))

const BadgeDetailDialog = () => {
  const { walletCurrentAddress, provider } = useRainbowContext()
  const {
    canvasUsername,
    badgeDetailDialogVisible,
    changeBadgeDetailDialog,
    selectedBadge,
    changeBadgesDialogVisible,
    queryVisibleBadges,
    isBadgeMinting,
    isBadgeUpgrading,
    changeIsBadgeMinting,
    changeIsBadgeUpgrading,
    changeSelectedBadge,
    upgradeBadgeAndRefreshUserBadges,
  } = useCanvasStore()
  const navigate = useNavigate()
  const { address: othersWalletAddress } = useParams()

  const alertWarning = useSnackbar()
  const { isMobile } = useCheckViewport()

  const [actionHeight, setActionHeight] = useState("auto")
  const actionsRef = useRef()

  const { data: badgeIssuer, isFetching } = useQuery({
    queryKey: ["notionBadge", selectedBadge.badgeContract],
    queryFn: async () => {
      const badge = await fetchNotionBadgeByAddr(selectedBadge.badgeContract)
      if (badge.issuer) {
        return badge.issuer
      } else if (selectedBadge.issuerName) {
        const issuer = await fetchIssuer(selectedBadge.issuerName)
        return issuer
      }
      return {}
    },
    initialData: {},
  })

  const shareBadgeURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/canvas/badge/${selectedBadge.id}`
    const myText = `I just minted ${selectedBadge.name} badge. Find out your eligibility on Scroll Canvas, too!`
    const othersText = "Checkout this badge and check your eligibility!"
    return generateShareTwitterURL(viewURL, othersWalletAddress ? othersText : myText)
  }, [selectedBadge, othersWalletAddress, canvasUsername])

  const shareBadgeContractURL = useMemo(() => {
    const viewURL = `${requireEnv("REACT_APP_FFRONTENDS_URL")}/canvas/badge-contract/${selectedBadge.badgeContract}`
    return generateShareTwitterURL(viewURL, `Find out your eligibility to mint a ${selectedBadge.name} badge on Scroll Canvas.`)
  }, [selectedBadge])

  useEffect(() => {
    if (badgeDetailDialogVisible !== BadgeDetailDialogType.HIDDEN && actionsRef?.current) {
      setActionHeight((actionsRef.current as HTMLDivElement).getBoundingClientRect().height + "px")
    }
  }, [badgeDetailDialogVisible])

  const handleClose = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeBadgesDialogVisible(BadgesDialogType.HIDDEN)
  }

  const handleMint = async () => {
    changeIsBadgeMinting(selectedBadge.badgeContract, true)
    try {
      const result = await mintBadge(provider, walletCurrentAddress, selectedBadge)
      // const result: any = await testAsyncFunc("0x11cfb299dda2ae8b1fccf9a055394de9a7f953e8b8f115295dc0f2325e8b2130")
      if (result) {
        await queryVisibleBadges(provider, walletCurrentAddress)
        alertWarning(
          <>
            {selectedBadge.name} minted successfully!<br></br>
            <Link underline="always" sx={{ color: "inherit", fontSize: "inherit" }} href={`/canvas/badge/${result}`}>
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
    navigate("/canvas")
  }

  const handleViewBadge = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeBadgesDialogVisible(BadgesDialogType.HIDDEN)
    navigate(`/canvas/badge/${selectedBadge.id}`)
  }

  const handleViewBadgeContract = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
    changeBadgesDialogVisible(BadgesDialogType.HIDDEN)
    navigate(`/canvas/badge-contract/${selectedBadge.badgeContract}`)
  }

  const handleBack = () => {
    changeBadgeDetailDialog(BadgeDetailDialogType.HIDDEN)
  }

  const handleUpgradeBadge = async () => {
    try {
      const metadata = await upgradeBadgeAndRefreshUserBadges(provider, selectedBadge)
      const checkedBadge = await checkBadgeUpgradable(provider, selectedBadge)
      // const checkedBadge: any = await testAsyncFunc({ upgradable: false })
      changeSelectedBadge({ ...selectedBadge, ...metadata, upgradable: checkedBadge.upgradable })
      alertWarning(`You have successfully upgraded ${selectedBadge.name} to ${metadata.name}`, "success")
    } catch (e) {
      alertWarning(`Something wrong, try again later`)
      sentryDebug(`upgrade badge: ${selectedBadge.id}-${e.message}`)
    } finally {
      changeIsBadgeUpgrading(selectedBadge.id, false)
    }
  }

  const renderMintTip = () => {
    return (
      <>
        {[BadgeDetailDialogType.NO_PROFILE].includes(badgeDetailDialogVisible) && (
          <Stack className="tip" direction="row" gap="0.8rem" alignItems="center" sx={{ mb: [0, "2.4rem"], px: [0, "4rem"] }}>
            <InfoOutlinedIcon sx={{ color: "#FAD880", fontSize: ["1.8rem", "2.4rem"] }} />
            <Typography sx={{ color: "#FAD880", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"] }}>
              You need a Scroll Canvas in order to mint your {selectedBadge.name} Badge.
            </Typography>
          </Stack>
        )}
        {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && selectedBadge.airdrop && (
          <Stack className="tip" direction="row" gap="0.8rem" alignItems="center" sx={{ mb: [0, "2.4rem"], px: [0, "4rem"] }}>
            <InfoOutlinedIcon sx={{ color: "#85E0D1", fontSize: ["1.8rem", "2.4rem"] }} />
            <Typography sx={{ color: "#85E0D1", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"] }}>
              You are eligible. Your badge will be airdroped by the issuer.
            </Typography>
          </Stack>
        )}
      </>
    )
  }

  return (
    <Dialog
      sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
      disablePortal={isMobile}
      open={badgeDetailDialogVisible !== BadgeDetailDialogType.HIDDEN}
      allowBack={[BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible)}
      roof={
        selectedBadge.upgradable && (
          <UpgradeAction
            sx={{ width: "100%", justifyContent: "center" }}
            loading={isBadgeUpgrading.get(selectedBadge.id)}
            onClick={handleUpgradeBadge}
          ></UpgradeAction>
        )
      }
      onBack={handleBack}
      onClose={handleClose}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent={isMobile ? "flex-start" : "center"}
        sx={{ width: ["100%", "57.6rem"], height: [`calc(100% - ${actionHeight})`, "54.6rem", "54.6rem", "54.6rem"] }}
      >
        <Img
          alt="img"
          src={ipfsToBrowserURL(selectedBadge.image)}
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
                theme => theme.multilineEllipsis,
              ]}
            >
              <BadgeDesc>{selectedBadge.description}</BadgeDesc>
            </Typography>

            <Stack direction="row" alignItems="center" gap="0.8rem" mb={isMobile ? "0.8rem" : "3.2rem"}>
              {isFetching ? (
                <Skeleton dark sx={{ width: "6.2rem", height: "3.2rem" }}></Skeleton>
              ) : (
                <>
                  <Avatar variant="square" src={badgeIssuer.logo} sx={{ width: "3.2rem", height: "3.2rem", borderRadius: "0.4rem" }}></Avatar>
                  <Typography sx={{ fontSize: ["1.8rem", "2rem"], fontWeight: 600, color: "primary.contrastText" }}>
                    {badgeIssuer.name || "Unknown"}
                  </Typography>
                </>
              )}
            </Stack>
          </>
        )}
        {!isMobile && renderMintTip()}

        <ButtonContainer ref={actionsRef}>
          {[BadgeDetailDialogType.MINT, BadgeDetailDialogType.MINT_WITH_BACK].includes(badgeDetailDialogVisible) && (
            <StyledScrollButton
              className="mintBtn"
              loading={isBadgeMinting.get(selectedBadge.badgeContract)}
              gloomy={selectedBadge.airdrop}
              color="primary"
              onClick={handleMint}
            >
              {isBadgeMinting.get(selectedBadge.badgeContract) ? "Minting" : "Mint badge"}
            </StyledScrollButton>
          )}
          {isMobile && renderMintTip()}

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
