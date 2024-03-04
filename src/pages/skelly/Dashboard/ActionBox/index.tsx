import copy from "copy-to-clipboard"
import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Menu, MenuItem, SvgIcon } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/bridge/copy-success.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import { ReactComponent as BadgesSvg } from "@/assets/svgs/skelly/badges.svg"
import { ReactComponent as EditSvg } from "@/assets/svgs/skelly/edit.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/skelly/eth.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import Button from "@/pages/skelly/components/Button"
import useSkellyStore from "@/stores/skellyStore"
import { requireEnv } from "@/utils"

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(4, 15.6rem)",
  justifyContent: "center",
  gap: "0.8rem",
  position: "absolute",
  bottom: "0",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 15.6rem)",
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
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}))

const ActionBox = props => {
  const { address: othersWalletAddress } = useParams()
  const { walletCurrentAddress } = useRainbowContext()

  const [copied, setCopied] = useState(false)

  const skellyUrl = useMemo(
    () => `${requireEnv("REACT_APP_FFRONTENDS_URL")}/scroll-skelly/${othersWalletAddress || walletCurrentAddress}`,
    [othersWalletAddress, walletCurrentAddress],
  )

  const shareTwitterURL = useMemo(() => {
    const text = "I have minted a Scroll Skelly!"
    return `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      skellyUrl,
    )}&text=${encodeURIComponent(text)}&via=Scroll_ZKP`
  }, [skellyUrl])

  const { changeBadgesDialog, changeProfileDialog, changeReferDialog, changeUpgradeDialog } = useSkellyStore()

  const handleCopyLink = useCallback(() => {
    copy(skellyUrl)
    setCopied(true)
  }, [])

  const handleCloseShare = () => {
    setShareAnchorEl(null)
  }

  const [badgesAnchorEl, setBadgesAnchorEl] = useState<null | HTMLElement>(null)
  const badgesOpen = Boolean(badgesAnchorEl)
  const handleClickBadges = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBadgesAnchorEl(event.currentTarget)
  }
  const handleCloseBadges = () => {
    setBadgesAnchorEl(null)
  }

  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const shareOpen = Boolean(shareAnchorEl)
  const handleClickShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShareAnchorEl(event.currentTarget)
  }

  return (
    <Container>
      {!othersWalletAddress && (
        <>
          <ActionButton
            variant="contained"
            color="primary"
            onClick={() => changeReferDialog(true)}
            startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={EthSvg} inheritViewBox></SvgIcon>}
          >
            Refer & Earn
          </ActionButton>
          <ActionButton
            onClick={handleClickBadges}
            color="secondary"
            startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={BadgesSvg} inheritViewBox></SvgIcon>}
          >
            Badges
          </ActionButton>
          <CustomMenu
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            anchorEl={badgesAnchorEl}
            open={badgesOpen}
            onClose={handleCloseBadges}
          >
            <CustomiseItem
              onClick={() => {
                handleCloseBadges()
                changeBadgesDialog(true)
              }}
            >
              Customise display
            </CustomiseItem>
            <CustomiseItem
              onClick={() => {
                handleCloseBadges()
                changeUpgradeDialog(true)
              }}
            >
              Mint badges
            </CustomiseItem>
          </CustomMenu>
          <ActionButton
            color="secondary"
            onClick={() => changeProfileDialog(true)}
            startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={EditSvg} inheritViewBox></SvgIcon>}
          >
            Name
          </ActionButton>
        </>
      )}
      <ActionButton
        onClick={handleClickShare}
        color="secondary"
        startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={ShareSvg} inheritViewBox></SvgIcon>}
      >
        Share Skelly
      </ActionButton>
      <CustomMenu
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        anchorEl={shareAnchorEl}
        open={shareOpen}
        onClose={handleCloseShare}
      >
        <CustomiseItem onClick={handleCloseShare}>
          <a target="_blank" rel="noreferrer" href={shareTwitterURL}>
            Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.3rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
          </a>
        </CustomiseItem>
        <CustomiseItem onClick={handleCopyLink}>
          <>Copy link</>
          {copied && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
        </CustomiseItem>
      </CustomMenu>
    </Container>
  )
}

export default ActionBox
