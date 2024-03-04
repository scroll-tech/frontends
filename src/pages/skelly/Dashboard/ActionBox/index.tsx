import copy from "copy-to-clipboard"
import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, Button, MenuItem, MenuList, SvgIcon, Tooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/system"

import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/bridge/copy-success.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import { ReactComponent as BadgesSvg } from "@/assets/svgs/skelly/badges.svg"
// import { ReactComponent as CheckSvg } from "@/assets/svgs/skelly/check.svg"
// import { ReactComponent as CopySvg } from "@/assets/svgs/skelly/copy.svg"
import { ReactComponent as EditSvg } from "@/assets/svgs/skelly/edit.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/skelly/eth.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
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
  display: "flex",
  width: "15.6rem",
  height: "4rem",
  padding: "0.8rem",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  flexWrap: "wrap",
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
}))

const CustomiseList = styled(MenuList)(({ theme }) => ({
  padding: "0 1rem",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  borderRadius: "0.8rem",
  overflow: "hidden",
  minWidth: "15.6rem",
}))

const CustomiseItem = styled(MenuItem)(({ theme }) => ({
  padding: "0.8rem",
  backgroundColor: "#FFFFFF",
  color: "#000000",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}))

const StyledTooltip = styled(Tooltip)(({ theme }) => ({}))

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
    setCopied(false)
  }

  // TODO: use Menu
  return (
    <Container>
      {!othersWalletAddress && (
        <>
          <ActionButton
            variant="contained"
            onClick={() => changeReferDialog(true)}
            startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={EthSvg} inheritViewBox></SvgIcon>}
          >
            Refer & Earn
          </ActionButton>
          <StyledTooltip
            PopperProps={{
              disablePortal: true,
            }}
            disableFocusListener
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}`]: {
                    zIndex: 998,
                  },
                  [`&.${tooltipClasses.popper} .${tooltipClasses.tooltip}`]: {
                    background: "transparent",
                  },
                },
              },
            }}
            title={
              <CustomiseList>
                <CustomiseItem onClick={() => changeBadgesDialog(true)}>Customise display</CustomiseItem>
                <CustomiseItem onClick={() => changeUpgradeDialog(true)}>Mint badges</CustomiseItem>
              </CustomiseList>
            }
          >
            <ActionButton startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={BadgesSvg} inheritViewBox></SvgIcon>}>Badges</ActionButton>
          </StyledTooltip>
          <ActionButton
            onClick={() => changeProfileDialog(true)}
            startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={EditSvg} inheritViewBox></SvgIcon>}
          >
            Name & Avatar
          </ActionButton>
        </>
      )}

      <StyledTooltip
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper} .${tooltipClasses.tooltip}`]: {
                background: "transparent",
              },
            },
          },
        }}
        title={
          <CustomiseList>
            <CustomiseItem>
              <a target="_blank" rel="noreferrer" href={shareTwitterURL}>
                Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.3rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
              </a>
            </CustomiseItem>
            <CustomiseItem onClick={handleCopyLink}>
              {/* <SvgIcon
                sx={{ fontSize: "1.8rem", color: "#000", marginRight: "0.2rem" }}
                component={copied ? CheckSvg : CopySvg}
                inheritViewBox
              ></SvgIcon> */}
              <>Copy link</>
              {copied && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
            </CustomiseItem>
          </CustomiseList>
        }
        onClose={handleCloseShare}
      >
        <ActionButton startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={ShareSvg} inheritViewBox></SvgIcon>}>Share Skelly</ActionButton>
      </StyledTooltip>
    </Container>
  )
}

export default ActionBox
