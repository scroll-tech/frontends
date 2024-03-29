import copy from "copy-to-clipboard"
import { Fragment, useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Menu, MenuItem, Slide, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BadgesSvg } from "@/assets/svgs/canvas/badges.svg"
import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/canvas/copy-success.svg"
import { ReactComponent as EditSvg } from "@/assets/svgs/canvas/edit.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/canvas/eth.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import Button from "@/pages/canvas/components/Button"
import useCanvasStore from "@/stores/canvasStore"
import { requireEnv } from "@/utils"

interface Action {
  label: string | (() => React.ReactNode)
  icon: React.ComponentType
  color: "primary" | "secondary"
  onClick: (event?) => void
  visible: boolean
  menu?: {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    items: Array<{
      label: string | (() => React.ReactNode)
      onClick: () => void
    }>
  }
}

const Container = styled<any>(Box, { shouldForwardProp: prop => prop !== "othersWalletAddress" })(({ theme, othersWalletAddress }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${othersWalletAddress ? 1 : 4}, 15.6rem)`,
  width: "100%",
  justifyContent: "center",
  gap: "0.8rem",
  position: "fixed",
  bottom: 0,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: `repeat(${othersWalletAddress ? 1 : 2}, 15.6rem)`,
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  width: "15.6rem",
  height: "4rem",
}))

const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0.8rem",
    padding: "0 0.8rem",
    marginTop: "-0.8rem",
    minWidth: "15.6rem",
  },
}))

const CustomiseItem = styled(MenuItem)(({ theme }) => ({
  padding: "0.8rem",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  fontSize: "1.6rem",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}))

const ActionBox = props => {
  const { mintableBadgeCount } = props
  const { address: othersWalletAddress } = useParams()
  const { walletCurrentAddress } = useRainbowContext()

  const [copied, setCopied] = useState(false)

  const canvasUrl = useMemo(
    () => `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-canvas/${othersWalletAddress || walletCurrentAddress}`,
    [othersWalletAddress, walletCurrentAddress],
  )

  const shareTwitterURL = useMemo(() => {
    const text = "I have minted a Scroll Canvas!"
    return `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      canvasUrl,
    )}&text=${encodeURIComponent(text)}&via=Scroll_ZKP`
  }, [canvasUrl])

  const { changeBadgesDialog, changeProfileDialog, changeReferDialog, changeUpgradeDialog } = useCanvasStore()

  const handleCopyLink = useCallback(() => {
    copy(canvasUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3e3)
  }, [])

  const handleCloseShare = () => {
    setShareAnchorEl(null)
    setCopied(false)
  }

  const [badgesAnchorEl, setBadgesAnchorEl] = useState<null | HTMLElement>(null)
  const badgesOpen = Boolean(badgesAnchorEl)

  // const [mintableBadgeCount, setMintableBadgeCount] = useState(0)

  // useEffect(() => {
  //   const fetchVisibleBadges = async () => {
  //     const filteredBadges = await Promise.all(
  //       Badges.map(async badge => {
  //         const isUserBadge = userBadges.some(userBadge => userBadge.badgeContract === badge.badgeContract)
  //         const isValidBadge = await badge.validator(walletCurrentAddress, provider)
  //         return {
  //           ...badge,
  //           isValid: !isUserBadge && isValidBadge,
  //         }
  //       }),
  //     )

  //     setMintableBadgeCount(filteredBadges.filter(badge => badge.isValid).length)
  //   }

  //   fetchVisibleBadges()
  // }, [userBadges, walletCurrentAddress, provider])

  const handleCloseBadges = () => {
    setBadgesAnchorEl(null)
  }

  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const shareOpen = Boolean(shareAnchorEl)

  const actions: Action[] = useMemo(() => {
    return [
      {
        label: "Refer & Earn",
        icon: EthSvg,
        color: "primary",
        onClick: () => changeReferDialog(true),
        visible: !othersWalletAddress,
      },
      {
        label: "Badges",
        icon: BadgesSvg,
        color: "secondary",
        onClick: event => {
          setBadgesAnchorEl(event.currentTarget)
        },
        visible: !othersWalletAddress,
        menu: {
          anchorEl: badgesAnchorEl,
          open: badgesOpen,
          onClose: handleCloseBadges,
          items: [
            {
              label: "Customize display",
              onClick: () => {
                handleCloseBadges()
                changeBadgesDialog(true)
              },
            },
            {
              label: `Mint badges${mintableBadgeCount ? " (" + mintableBadgeCount + ")" : ""}`,
              onClick: () => {
                handleCloseBadges()
                changeUpgradeDialog(true)
              },
            },
          ],
        },
      },
      {
        label: "Name",
        icon: EditSvg,
        color: "secondary",
        onClick: () => changeProfileDialog(true),
        visible: !othersWalletAddress,
      },

      {
        label: "Share Canvas",
        icon: ShareSvg,
        color: "secondary",
        onClick: event => {
          setShareAnchorEl(event.currentTarget)
        },
        visible: true,
        menu: {
          anchorEl: shareAnchorEl,
          open: shareOpen,
          onClose: handleCloseShare,
          items: [
            {
              label: () => (
                <>
                  Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.3rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
                </>
              ),
              onClick: () => {
                handleCloseShare()
                window.open(shareTwitterURL)
              },
            },
            {
              label: () => (
                <>
                  {copied ? "Link copied" : "Copy link"}
                  {copied && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}{" "}
                </>
              ),
              onClick: handleCopyLink,
            },
          ],
        },
      },
    ]
  }, [othersWalletAddress, shareTwitterURL, badgesAnchorEl, badgesOpen, shareAnchorEl, shareOpen, handleCopyLink, copied, mintableBadgeCount])

  return (
    <Slide in direction="up">
      <Container othersWalletAddress={othersWalletAddress}>
        {actions
          .filter(action => action.visible)
          .map((action, index) => (
            <Fragment key={index}>
              <ActionButton
                key={index}
                color={action.color as any}
                onClick={action.onClick}
                startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={action.icon} inheritViewBox></SvgIcon>}
              >
                {typeof action.label === "function" ? action.label() : action.label}
              </ActionButton>
              {action.menu && (
                <CustomMenu
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorEl={action.menu.anchorEl}
                  open={action.menu.open}
                  onClose={action.menu.onClose}
                >
                  {action.menu.items.map((item, index) => (
                    <CustomiseItem key={index} onClick={item.onClick}>
                      {typeof item.label === "function" ? item.label() : item.label}
                    </CustomiseItem>
                  ))}
                </CustomMenu>
              )}
            </Fragment>
          ))}
      </Container>
    </Slide>
  )
}

export default ActionBox
