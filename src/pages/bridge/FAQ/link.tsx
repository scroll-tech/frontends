import { Link } from "react-router-dom"

import { Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as LinkSvg } from "@/assets/svgs/bridge/external-link.svg"

const FAQsLink = styled(Link)(({ theme }) => ({
  color: "#6D6D6D",
  fontSize: "1.4rem",
  fontWeight: 600,
  textDecoration: "underline",
  svg: {
    marginLeft: "0.2rem",
    fontSize: "0.8rem",
  },
}))

const BridgeLinks = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing="2rem" sx={{ width: "100%", marginTop: "1rem" }}>
      <FAQsLink to="faq">
        FAQs
        <SvgIcon component={LinkSvg} inheritViewBox></SvgIcon>
      </FAQsLink>
      <FAQsLink to="/terms-of-service">
        Terms of Service
        <SvgIcon component={LinkSvg} inheritViewBox></SvgIcon>
      </FAQsLink>
      <Typography> © Version V2.2.18</Typography>
    </Stack>
  )
}

export default BridgeLinks
