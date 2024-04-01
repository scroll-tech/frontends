import copy from "copy-to-clipboard"
import { useState } from "react"
import useSWR from "swr"
import { makeStyles } from "tss-react/mui"

import { Box, Button, Menu, MenuItem, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { fetchCodeByAdd, getInviteUrlByCode } from "@/apis/canvas"
import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/canvas/copy-success.svg"
import couponBackground from "@/assets/svgs/canvas/coupon.svg"
import { ReactComponent as LogoSvg } from "@/assets/svgs/canvas/logo.svg"
import { ReactComponent as ShareSvg } from "@/assets/svgs/canvas/share.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/nft/twitter.svg"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import useCanvasStore from "@/stores/canvasStore"

const CouponBox = styled(Box)(({ theme }) => ({
  background: `url(${couponBackground}) no-repeat center center`,
  width: "65.2rem",
  height: "26.2rem",
  margin: "0 15.4rem 9.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2.4rem 1.6rem",
}))

const DescriptionBox = styled(Typography)(({ theme }) => ({
  border: "1px solid #000",
  background: "#FDE9D5",
  height: "22.2rem",
  width: "23.2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}))

// const ReferralLink = styled(Typography)(({ theme }) => ({
//   borderRadius: "0.6rem",
//   border: "0.15rem solid #000",
//   background: "#FFF",
//   fontSize: "4rem",
//   textAlign: "center",
//   width: "34rem",
//   height: "7.2rem",
//   lineHeight: "7.2rem",
//   fontWeight: 500,
// }))

const useStyles = makeStyles()(theme => ({
  paper: {
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
    transformOrigin: "50% 0px !important",
  },
  list: {
    padding: 0,
    width: "34rem",
  },
  item: {
    width: "100%",
    padding: "0.8rem 1.6rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    justifyContent: "center",
  },
  codeWrapper: {
    borderRadius: "0.6rem",
    border: `0.15rem solid ${theme.palette.text.primary}`,
    background: theme.palette.background.default,
    width: "34rem",
    height: "7.2rem",
  },
}))

let copyTimer: any

const Coupon = props => {
  const { shouldFetch } = props
  const { classes } = useStyles()
  const { walletCurrentAddress } = useRainbowContext()
  const [copied, setCopied] = useState(0)

  const { username } = useCanvasStore()
  const alertWarning = useSnackbar()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const fetchCode = url => scrollRequest(url)
  const { data: { code } = {}, isLoading } = useSWR(() => (shouldFetch ? fetchCodeByAdd(walletCurrentAddress) : null), fetchCode, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    onError: () => {
      alertWarning("Failed to fetch Scroll Canvas Coupon", "coupon")
    },
  })

  const handleDropdown = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCopied(0)
  }

  const handleShareToX = () => {
    const inviteUrl = getInviteUrlByCode(code)

    const shareUrl = `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&url=${encodeURIComponent(
      inviteUrl,
    )}&via=Scroll_ZKP`
    window.open(shareUrl)
    handleClose()
  }
  const handleCopyLink = () => {
    const inviteUrl = getInviteUrlByCode(code)
    copy(inviteUrl)
    setCopied(1)
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      setCopied(0)
    }, 15e2)
  }

  const handleCopyCode = () => {
    copy(code)
    setCopied(2)
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      setCopied(0)
    }, 15e2)
  }

  return (
    <CouponBox>
      <DescriptionBox>
        <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.4rem" }}>From: {username}</Typography>
        <Typography sx={{ fontSize: "4.8rem", lineHeight: "1", fontWeight: 500, margin: "0.8rem 0" }}>50% OFF</Typography>
        <Typography sx={{ fontSize: "1.8rem", marginBottom: "2.3rem", lineHeight: "2.4rem" }}>Mint Fee</Typography>
        <SvgIcon sx={{ width: "8rem" }} component={LogoSvg} inheritViewBox />
      </DescriptionBox>
      <Stack direction="column" alignItems="center" gap="1.5rem">
        <Typography sx={{ fontSize: "2.8rem", lineHeight: "normal", fontWeight: 500 }}>Scroll Canvas Coupon</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" className={classes.codeWrapper}>
          {isLoading ? (
            <Skeleton size="small" white sx={{ width: "60%", height: "3rem" }}></Skeleton>
          ) : (
            <Typography sx={{ fontSize: "4rem", fontWeight: 500, lineHeight: "7.2rem" }}>{code}</Typography>
          )}
        </Stack>

        <Button
          sx={{ width: "100%" }}
          disabled={isLoading}
          variant="contained"
          color="secondary"
          startIcon={<SvgIcon component={ShareSvg} inheritViewBox></SvgIcon>}
          onClick={handleDropdown}
        >
          Share
        </Button>
        <Menu classes={{ paper: classes.paper, list: classes.list }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem classes={{ root: classes.item }} onClick={handleShareToX}>
            Share to <SvgIcon sx={{ fontSize: ["1.2rem", "1.3rem"], ml: "6px" }} component={TwitterSvg} inheritViewBox></SvgIcon>
          </MenuItem>
          <MenuItem classes={{ root: classes.item }} onClick={handleCopyLink}>
            <>{copied === 1 ? "Link copied" : "Copy link"}</>
            {copied === 1 && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
          </MenuItem>
          <MenuItem classes={{ root: classes.item }} onClick={handleCopyCode}>
            <>{copied === 2 ? "Coupon code copied" : "Copy coupon code"}</>
            {copied === 2 && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
          </MenuItem>
        </Menu>
      </Stack>
    </CouponBox>
  )
}

export default Coupon
