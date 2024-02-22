import copy from "copy-to-clipboard"
import { useCallback, useMemo, useState } from "react"

import { Box, Button, MenuItem, MenuList, SvgIcon, Tooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/system"

import { ReactComponent as BadgesSvg } from "@/assets/svgs/skelly/badges.svg"
import { ReactComponent as CheckSvg } from "@/assets/svgs/skelly/check.svg"
import { ReactComponent as CopySvg } from "@/assets/svgs/skelly/copy.svg"
import { ReactComponent as EditSvg } from "@/assets/svgs/skelly/edit.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/skelly/eth.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/skelly/share.svg"
import useSkellyStore from "@/stores/skellyStore"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.8rem",
  position: "absolute",
  bottom: "0",
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

const ActionBox = () => {
  const [copied, setCopied] = useState(false)

  const shareTwitterURL = useMemo(() => {
    const viewerUrl = `https://scroll.io/skelly/1`
    return `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      viewerUrl,
    )}&text=${encodeURIComponent("I have minted a Scroll Skelly!")}&via=Scroll_ZKP`
  }, [])

  const { changeBadgesDialog, changeProfileDialog, changeReferDialog, changeUpgradeDialog } = useSkellyStore()

  const copyAddress = useCallback(() => {
    copy(window.location.href + "?referral=KAZ1R")
    setCopied(true)
  }, [])

  return (
    <Container>
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
            <CustomiseItem onClick={() => changeUpgradeDialog(true)}>Upgrade badges</CustomiseItem>
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
                Share to X
              </a>
            </CustomiseItem>
            <CustomiseItem onClick={copyAddress}>
              <SvgIcon
                sx={{ fontSize: "1.8rem", color: "#000", marginRight: "0.2rem" }}
                component={copied ? CheckSvg : CopySvg}
                inheritViewBox
              ></SvgIcon>
              {copied ? "Copied" : "Copy link"}
            </CustomiseItem>
          </CustomiseList>
        }
      >
        <ActionButton startIcon={<SvgIcon sx={{ fontSize: "1.6rem" }} component={ShareSvg} inheritViewBox></SvgIcon>}>Share Skelly</ActionButton>
      </StyledTooltip>
    </Container>
  )
}

export default ActionBox
