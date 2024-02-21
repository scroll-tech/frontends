import { useState } from "react"

import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { ReactComponent as StickerSvg } from "@/assets/svgs/skelly/sticker.svg"
import TriangleSvg from "@/assets/svgs/skelly/triangle.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import BadgeDetailDialog from "@/pages/skelly/dashboard/BadgeDetailDialog"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "5rem",
  right: "2.7rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
}))

const Tooltip = styled(Box)(({ theme }) => ({
  padding: "1rem 1.4rem 1.4rem",
  width: "30rem",
  position: "relative",
  boxSizing: "border-box",
  background: "#fff",
  backgroundClip: "padding-box",
  border: "solid 2px transparent",
  borderRadius: "1rem",
  marginBottom: "2rem",

  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    margin: "-2px",
    borderRadius: "inherit",
    background: "linear-gradient(90deg, #F0C86F, #FF684B, #FAD880, #90F7EB)",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: "100%",
    right: "1.5rem",
    left: "40%",
    height: "2rem",
    width: "2rem",
    background: `url(${TriangleSvg})`,
    backgroundSize: "cover",
    transform: "rotate(270deg)",
  },
}))

const MintButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  lineHeight: "2.4rem",
  height: "4rem",
}))

const MintBadge = props => {
  const [open, setOpen] = useState(true)
  const { changeBadgeDetailDialog } = useSkellyStore()

  const handleMintBadge = () => {
    setOpen(false)
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINT)
  }

  return (
    <Container>
      {open && (
        <>
          <Tooltip>
            <Typography sx={{ textAlign: "right" }}>
              <SvgIcon sx={{ fontSize: "1.3rem" }} onClick={() => setOpen(false)} component={CloseSvg} inheritViewBox></SvgIcon>
            </Typography>
            <Typography sx={{ fontSize: "1.6rem", fontWeight: 500, marginBottom: "1.2rem" }}>
              Heya! Congratulations! You can mint "Scroll native badge Scroll" on Scroll Skelly.
            </Typography>
            <MintButton variant="contained" color="primary" sx={{ width: "100%" }} onClick={handleMintBadge}>
              Mint badge
            </MintButton>
          </Tooltip>
          <SvgIcon sx={{ fontSize: "13rem" }} component={StickerSvg} inheritViewBox></SvgIcon>
        </>
      )}

      <BadgeDetailDialog />
    </Container>
  )
}

export default MintBadge
