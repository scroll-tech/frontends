import copy from "copy-to-clipboard"
import { useState } from "react"
import useSWR from "swr"
import { makeStyles } from "tss-react/mui"

import { Box, Button, Menu, MenuItem, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { fetchCodeByAdd, getInviteUrlByCode } from "@/apis/canvas"
import CopySuccessSvg from "@/assets/svgs/canvas/copy-success.svg"
import couponMobileBackground from "@/assets/svgs/canvas/coupon-mobile.svg?url"
import couponBackground from "@/assets/svgs/canvas/coupon.svg?url"
import LogoSvg from "@/assets/svgs/canvas/logo.svg"
import ShareSvg from "@/assets/svgs/canvas/share.svg"
import TwitterSvg from "@/assets/svgs/nft/twitter.svg"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import useCanvasStore from "@/stores/canvasStore"
import { generateShareTwitterURL } from "@/utils"

const CouponBox = styled(Box)(({ theme }) => ({
  background: `url(${couponBackground}) no-repeat center center`,
  width: "65.2rem",
  height: "26.2rem",
  margin: "0 15.4rem 9.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2.4rem 1.6rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
    aspectRatio: "320/158",
    background: `url(${couponMobileBackground}) no-repeat center center`,
    backgroundSize: "contain",
    padding: "1.4rem 1.2rem",
    margin: 0,
    gap: "3rem",
  },
}))

const DescriptionBox = styled(Box)(({ theme }) => ({
  border: "1px solid #000",
  background: "#FDE9D5",
  height: "22.2rem",
  width: "23.2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    height: "13.4rem",
    flex: 110,
    padding: "1rem 1rem 0",
  },
}))

const useStyles = makeStyles<any>()((theme, { dropdownWidth }) => ({
  paper: {
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
    transformOrigin: "50% 0px !important",
  },
  list: {
    padding: 0,
    width: "34rem",
    [theme.breakpoints.down("sm")]: {
      width: dropdownWidth,
    },
  },
  item: {
    width: "100%",
    padding: "0.8rem 1.6rem",
    fontSize: "1.6rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      minHeight: "unset",
    },
  },
  codeWrapper: {
    borderRadius: "0.6rem",
    border: `0.15rem solid ${theme.palette.text.primary}`,
    background: theme.palette.background.default,
    width: "34rem",
    height: "7.2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "4rem",
    },
  },
}))

let copyTimer: any

const Coupon = props => {
  const { shouldFetch } = props
  const [dropdownWidth, setDropdownWidth] = useState<string>()

  const { classes } = useStyles({ dropdownWidth: dropdownWidth ? dropdownWidth : "auto" })
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
      alertWarning("Failed to fetch Scroll Canvas Coupon")
    },
  })

  const handleDropdown = e => {
    setAnchorEl(e.currentTarget)
    if (e.currentTarget) {
      setDropdownWidth(e.currentTarget.getBoundingClientRect().width + "px")
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCopied(0)
  }

  const handleShareToX = () => {
    const inviteUrl = getInviteUrlByCode(code)
    const text = "Use my invite code to save 50% on Scroll Canvas mint!"
    const shareUrl = generateShareTwitterURL(inviteUrl, text)
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
        <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], fontWeight: 500, lineHeight: ["2rem", "2.4rem"] }}>From: {username}</Typography>
        <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["3.2rem", 1], fontWeight: 500, my: ["0.4rem", "0.8rem"] }}>50% OFF</Typography>
        <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], mb: ["0.6rem", "2.3rem"], lineHeight: ["2rem", "2.4rem"], fontWeight: 500 }}>
          Mint Fee
        </Typography>
        <SvgIcon sx={{ width: ["4.2rem", "8rem"] }} component={LogoSvg} inheritViewBox />
      </DescriptionBox>
      <Stack direction="column" alignItems="center" sx={{ flex: [170, "unset"], gap: ["0.8rem", "1.5rem"] }}>
        <Typography sx={{ fontSize: ["1.6rem", "2.8rem"], lineHeight: ["2.4rem", "normal"], fontWeight: 500 }}>Invite Code</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" className={classes.codeWrapper}>
          {isLoading ? (
            <Skeleton size="small" white sx={{ width: "60%", height: "3rem" }}></Skeleton>
          ) : (
            <Typography sx={{ fontSize: ["2rem", "4rem"], fontFamily: "var(--developer-page-font-family)" }}>{code}</Typography>
          )}
        </Stack>

        <Button
          sx={[
            { width: "100%", fontWeight: 600, fontSize: ["1.6rem", "2rem"] },
            theme => ({
              [theme.breakpoints.down("sm")]: {
                height: "4rem",
              },
            }),
          ]}
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
            {copied === 1 && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
            <>{copied === 1 ? "Link copied" : "Copy link"}</>
          </MenuItem>
          <MenuItem classes={{ root: classes.item }} onClick={handleCopyCode}>
            {copied === 2 && <SvgIcon sx={{ ml: "0.6rem" }} component={CopySuccessSvg} inheritViewBox></SvgIcon>}
            <>{copied === 2 ? "Code copied" : "Copy code"}</>
          </MenuItem>
        </Menu>
      </Stack>
    </CouponBox>
  )
}

export default Coupon
