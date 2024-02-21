import copy from "copy-to-clipboard"
import { useCallback, useState } from "react"

import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CheckSvg } from "@/assets/svgs/skelly/check.svg"
import { ReactComponent as CopySvg } from "@/assets/svgs/skelly/copy.svg"
import couponBackground from "@/assets/svgs/skelly/coupon.svg"
import { ReactComponent as LogoSvg } from "@/assets/svgs/skelly/logo.svg"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"

const CouponBox = styled(Box)(({ theme }) => ({
  background: `url(${couponBackground}) no-repeat center center`,
  width: "65.2rem",
  height: "26.2rem",
  margin: "0 15.4rem 12.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2.4rem 1.6rem",
}))

const CopyBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
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

const ReferralLink = styled(Typography)(({ theme }) => ({
  borderRadius: "0.6rem",
  border: "0.15rem solid #000",
  background: "#FFF",
  fontSize: "4rem",
  textAlign: "center",
  width: "34rem",
  margin: "1.5rem 0",
  height: "7.2rem",
  lineHeight: "7.2rem",
  fontWeight: 500,
}))

const CopyButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.6rem",
  border: "0.15rem solid #000",
  fontSize: "2rem",
  width: "34rem",
  height: "5.6rem",
  fontWeight: 600,
  color: "#FFF",
  backgroundColor: "#000",
  "&:hover": {
    backgroundColor: "#000",
    color: "#FFF",
  },
}))

const Coupon = () => {
  const [copied, setCopied] = useState(false)
  const { profileInstance } = useSkellyContext()

  const copyAddress = useCallback(() => {
    copy(window.location.href + "?referral=KAZ1R")
    setCopied(true)
  }, [])

  return (
    <CouponBox>
      <DescriptionBox>
        <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.4rem" }}>From: {profileInstance.name}</Typography>
        <Typography sx={{ fontSize: "4.8rem", lineHeight: "1", fontWeight: 500, margin: "0.8rem 0" }}>50% OFF</Typography>
        <Typography sx={{ fontSize: "1.8rem", marginBottom: "2.3rem", lineHeight: "2.4rem" }}>Mint Fee</Typography>
        <SvgIcon sx={{ width: "8rem" }} component={LogoSvg} inheritViewBox />
      </DescriptionBox>
      <CopyBox>
        <Typography sx={{ fontSize: "2.8rem", lineHeight: "normal", fontWeight: 500 }}>Scroll Skelly Coupon</Typography>
        <ReferralLink>KAZ1R</ReferralLink>
        <CopyButton
          startIcon={<SvgIcon sx={{ fontSize: "3rem" }} component={copied ? CheckSvg : CopySvg} inheritViewBox></SvgIcon>}
          onClick={copyAddress}
        >
          {copied ? "Copied" : "Copy"}
        </CopyButton>
      </CopyBox>
    </CouponBox>
  )
}

export default Coupon
