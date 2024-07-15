import { useMemo } from "react"
import Img from "react-cool-img"

import { List } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"
import LoadingPage from "@/components/LoadingPage"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import Button from "@/pages/canvas/components/Button"
import Dialog from "@/pages/canvas/components/Dialog"
import Empty from "@/pages/canvas/components/Empty"
import useCanvasStore, { BadgeDetailDialogType, BadgesDialogType } from "@/stores/canvasStore"

import BadgeItem from "./BadgeItem"

// const BADGES_COPY = {
//   [BadgesDialogType.MINT]: {
//     title: "Mint eligible badges",
//   },
//   [BadgesDialogType.UPGRADE]: {
//     title: "Upgrade badges",
//   },
// }

const StyledList = styled(List)(({ theme }) => ({
  width: "57.6rem",
  height: "53.8rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  padding: "2.4rem 0 0",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(209, 205, 204, 0.30)",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",

  "& .MuiListItem-root": {
    gap: "1.6rem",
  },

  [theme.breakpoints.down("sm")]: {
    height: "100%",
    maxHeight: "unset",
  },
}))

const BadgesDialog = props => {
  const { badges, loading } = props
  const { provider } = useRainbowContext()
  const { isMobile } = useCheckViewport()
  const alertWarning = useSnackbar()

  const {
    isBadgeUpgrading,
    badgesDialogVisible,
    changeBadgesDialogVisible,
    changeBadgeDetailDialog,
    changeSelectedBadge,
    upgradeBadgeAndRefreshUserBadges,
  } = useCanvasStore()

  const dialogTitle = useMemo(
    () => (badgesDialogVisible === BadgesDialogType.MINT ? "Mint eligible badges" : "Upgrade badges"),
    [badgesDialogVisible],
  )

  const handleClose = () => {
    changeBadgesDialogVisible(BadgesDialogType.HIDDEN)
  }

  const handleViewBadge = async badge => {
    changeSelectedBadge(badge)
    changeBadgeDetailDialog(BadgeDetailDialogType.MINT_WITH_BACK)
  }

  const handleUpgradeBadge = async badge => {
    await upgradeBadgeAndRefreshUserBadges(provider, badge)
    alertWarning(
      <>
        {badge.name} upgraded successfully!<br></br>
        <Link underline="always" sx={{ color: "inherit", fontSize: "inherit" }} href={`/canvas/badge/${badge.id}`}>
          View badge details
        </Link>
      </>,
      "success",
    )
  }

  if (loading) {
    return (
      <Dialog title={dialogTitle} open={!!badgesDialogVisible} onClose={handleClose}>
        <StyledList>
          <LoadingPage
            height="100%"
            component={<Img src="/imgs/canvas/Scrolly_Coding_s.webp" alt="Coding Scrolly" width={isMobile ? "120" : "200"} />}
          ></LoadingPage>
        </StyledList>
      </Dialog>
    )
  }

  // only for mint dialog
  if (!badges.length) {
    return (
      <Dialog onClose={handleClose} open={!!badgesDialogVisible}>
        <Empty title="No eligible badges for minting" sx={{ width: "57.6rem", height: ["auto", "62.7rem"] }}></Empty>
      </Dialog>
    )
  }

  return (
    <Dialog title={dialogTitle} open={!!badgesDialogVisible} onClose={handleClose}>
      <StyledList>
        {badges.map((badge, index) => (
          <>
            {badgesDialogVisible === BadgesDialogType.MINT ? (
              <BadgeItem key={index} badge={badge} onClick={() => handleViewBadge(badge)} />
            ) : (
              <BadgeItem
                key={index}
                badge={badge}
                action={
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ borderRadius: "0.8rem", width: ["100%", "18.5rem"], fontSize: "1.6rem", padding: 0, borderColor: "#fff !important" }}
                    loading={isBadgeUpgrading.get(badge.id)}
                    onClick={handleUpgradeBadge}
                  >
                    Upgrade now
                  </Button>
                }
              />
            )}
          </>
        ))}
      </StyledList>
    </Dialog>
  )
}

export default BadgesDialog
