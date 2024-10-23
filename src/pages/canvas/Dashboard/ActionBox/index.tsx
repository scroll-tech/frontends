import copy from "copy-to-clipboard"
import { motion } from "framer-motion"
import { Fragment, useCallback, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Badge, Box, CircularProgress, Menu, MenuItem, Slide, Stack, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BadgesSvg } from "@/assets/svgs/canvas/badges.svg"
import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/canvas/copy-success.svg"
import { ReactComponent as EditSvg } from "@/assets/svgs/canvas/edit.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/canvas/eth.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import { ReactComponent as ExternalLinkSvg } from "@/assets/svgs/common/external-link.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import { ISSUE_BADGES_URL } from "@/constants"
import { EXPLORE_BADGES_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import Button from "@/pages/canvas/components/Button"
import useCanvasStore, { BadgesDialogType } from "@/stores/canvasStore"
import { generateShareTwitterURL, requireEnv } from "@/utils"

const AnimatedMenuItem = motion(MenuItem)

interface Action {
  label: string | (() => React.ReactNode)
  icon: React.ComponentType
  color: "primary" | "secondary"
  onClick: (event?) => void
  visible: boolean
  withBadge?: boolean
  menu?: {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    items: Array<{
      key: string
      label: string | (() => React.ReactNode)
      extra?: React.ReactNode
      external?: boolean
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
  position: "absolute",
  bottom: 0,
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: `repeat(${othersWalletAddress ? 1 : 2}, 15.6rem)`,
    zIndex: 99,
    padding: "2.4rem 2rem",
    bottom: 0,
    "& > button": {
      width: "100%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `repeat(${othersWalletAddress ? 1 : 2}, 1fr)`,
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  width: "15.6rem",
  height: "4rem",
  borderRadius: "0.4rem",
  fontSize: "1.6rem",
  ".MuiButton-startIcon>*:nth-of-type(1)": {
    fontSize: "2rem",
  },
  ".MuiButton-startIcon": {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginRight: "4px",
    },
  },
}))

const CustomMenu = styled<any>(Menu, { shouldForwardProp: prop => prop !== "dropdownWidth" })(({ theme, dropdownWidth }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0.5rem",
    padding: "0 0.8rem",
    marginTop: "-0.8rem",
    minWidth: "15.6rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: dropdownWidth,
    },
  },
  "& .MuiMenu-list": {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}))

const CustomiseItem = styled<any>(AnimatedMenuItem, { shouldForwardProp: prop => prop !== "external" })(({ theme, external }) => ({
  position: "relative",
  display: "flex",
  justifyContent: external ? "flex-start" : "space-between",
  gap: "0.8rem",
  padding: "0.8rem",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  fontSize: "1.6rem",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#FFFFFF",
    color: theme.palette.primary.main,
  },
}))

const BadgeCount = styled("span")(({ theme }) => ({
  display: "inline-block",
  height: "1.6rem",
  minWidth: "1.6rem",
  borderRadius: "0.8rem",
  padding: "0 3px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontFamily: "var(--developer-page-font-family)",
  fontSize: "1rem",
  lineHeight: "1.6rem",
  textAlign: "center",
  marginLeft: "1.6rem",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0.8rem",
  },
}))

const ActionBox = () => {
  const { address: othersWalletAddress } = useParams()
  const navigate = useNavigate()

  const { walletCurrentAddress } = useRainbowContext()
  const {
    changeCustomizeDisplayDialogVisible,
    changeProfileDialog,
    changeReferDialog,
    changeBadgesDialogVisible,
    upgradableBadges,
    pickUpgradableBadgesLoading,
  } = useCanvasStore()

  const { isPortrait } = useCheckViewport()

  const [copied, setCopied] = useState(false)

  const canvasUrl = useMemo(
    () => `${requireEnv("REACT_APP_FFRONTENDS_URL")}/canvas/${othersWalletAddress || walletCurrentAddress}`,
    [othersWalletAddress, walletCurrentAddress],
  )

  const shareTwitterURL = useMemo(() => {
    const myText = "Build your onchain story. I just minted my Scroll Canvas and collected my first badge!"
    const othersText = "Check out this Scroll Canvas!"
    const text = othersWalletAddress ? othersText : myText
    return generateShareTwitterURL(canvasUrl, text)
  }, [canvasUrl, othersWalletAddress])

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
  const [isHovering, setIsHovering] = useState("")

  const badgesOpen = Boolean(badgesAnchorEl)

  const handleCloseMenu = () => {
    setBadgesAnchorEl(null)
  }

  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const [dropdownWidth, setDropdownWidth] = useState<string>()

  const shareOpen = Boolean(shareAnchorEl)

  const actions: Action[] = useMemo(() => {
    return [
      {
        label: "Invite & Give",
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
          if (event.currentTarget) {
            setDropdownWidth(event.currentTarget.getBoundingClientRect().width + "px")
          }
        },
        visible: !othersWalletAddress,
        withBadge: !!upgradableBadges.length,
        loading: pickUpgradableBadgesLoading,
        menu: {
          anchorEl: badgesAnchorEl,
          open: badgesOpen,
          onClose: handleCloseMenu,
          items: [
            {
              key: "customize",
              label: "Customize display",
              onClick: () => {
                handleCloseMenu()
                changeCustomizeDisplayDialogVisible(true)
              },
            },
            ...(upgradableBadges.length
              ? [
                  {
                    key: "upgrade",
                    label: "Upgrade badges",
                    extra: upgradableBadges.length ? <BadgeCount>{upgradableBadges.length > 99 ? "99+" : upgradableBadges.length}</BadgeCount> : null,
                    onClick: () => {
                      handleCloseMenu()
                      changeBadgesDialogVisible(BadgesDialogType.UPGRADE)
                    },
                  },
                ]
              : []),
            {
              key: "explore",
              label: "Explore badges",
              onClick: () => {
                navigate(EXPLORE_BADGES_URL)
              },
            },
            {
              key: "issue",
              label: "Issue badges",
              external: true,
              onClick: () => {
                window.open(ISSUE_BADGES_URL)
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
          if (event.currentTarget) {
            setDropdownWidth(event.currentTarget.getBoundingClientRect().width + "px")
          }
        },
        visible: true,
        menu: {
          anchorEl: shareAnchorEl,
          open: shareOpen,
          onClose: handleCloseShare,
          items: [
            {
              key: "twitter",
              label: () => (
                <Stack direction="row" gap="0.6rem" alignItems="center">
                  <>Share to</>
                  <SvgIcon sx={{ fontSize: ["1.2rem", "1.3rem"] }} component={TwitterSvg} inheritViewBox></SvgIcon>
                </Stack>
              ),
              onClick: () => {
                handleCloseShare()
                window.open(shareTwitterURL)
              },
            },
            {
              key: "link",
              label: () => (
                <>
                  {copied ? "Link copied" : "Copy link"}
                  {copied && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
                </>
              ),
              onClick: handleCopyLink,
            },
          ],
        },
      },
    ]
  }, [
    othersWalletAddress,
    shareTwitterURL,
    badgesAnchorEl,
    badgesOpen,
    shareAnchorEl,
    shareOpen,
    handleCopyLink,
    copied,
    upgradableBadges.length,
    pickUpgradableBadgesLoading,
  ])

  const handleMouseEnter = item => {
    if (item.external) {
      setIsHovering(item.key)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering("")
  }

  const renderActionIcon = action => {
    if (action.withBadge) {
      return (
        <Badge color="primary" variant="dot">
          <SvgIcon sx={{ fontSize: "2.4rem" }} component={action.icon} inheritViewBox></SvgIcon>
        </Badge>
      )
    } else if (action.loading) {
      return (
        <>
          <SvgIcon sx={{ fontSize: "2.4rem !important" }} component={action.icon} inheritViewBox></SvgIcon>
          <CircularProgress sx={{ position: "absolute", right: "-3px", top: "-3px" }} size={10} thickness={8} color="inherit"></CircularProgress>
        </>
      )
    }
    return <SvgIcon sx={{ fontSize: "2.4rem !important" }} component={action.icon} inheritViewBox></SvgIcon>
  }

  return (
    <Slide in direction="up">
      <Container othersWalletAddress={othersWalletAddress}>
        {actions
          .filter(action => action.visible)
          .map((action, index) => (
            <Fragment key={index}>
              <ActionButton key={index} color={action.color as any} onClick={action.onClick} startIcon={(() => renderActionIcon(action))()}>
                {typeof action.label === "function" ? action.label() : action.label}
              </ActionButton>
              {action.menu && (
                <CustomMenu
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: isPortrait ? "right" : "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: isPortrait ? "right" : "left",
                  }}
                  anchorEl={action.menu.anchorEl}
                  dropdownWidth={dropdownWidth}
                  open={action.menu.open}
                  onClose={action.menu.onClose}
                >
                  {action.menu.items.map((item, index) => (
                    <CustomiseItem
                      key={index}
                      onClick={item.onClick}
                      external={item.external}
                      onHoverStart={() => handleMouseEnter(item)}
                      onHoverEnd={handleMouseLeave}
                      animate={isHovering === item.key ? "active" : "inactive"}
                    >
                      {typeof item.label === "function" ? item.label() : item.label}
                      {item.extra}
                      {item.external && (
                        <motion.div
                          variants={{
                            active: {
                              x: 0,
                              opacity: 1,
                            },
                            inactive: {
                              x: -8,
                              opacity: 0,
                            },
                          }}
                        >
                          <SvgIcon component={ExternalLinkSvg} sx={{ fontSize: "1.2rem", color: "primary.main" }}></SvgIcon>
                        </motion.div>
                      )}
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
