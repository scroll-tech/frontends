import { useEffect } from "react"
import Img from "react-cool-img"

import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import Button from "@/pages/canvas/components/Button"
import useCanvasStore, { BadgeDetailDialogType } from "@/stores/canvasStore"

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "100%",
  padding: "0",
  cursor: "pointer",
  "& *": {
    cursor: "pointer !important",
  },
  "& .MuiListItemSecondaryAction-root": {
    right: "0",
  },
}))

const StyledListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  "& img": {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
      height: "4.8rem",
    },
  },
  "& .MuiAvatar-img": {
    objectFit: "contain !important",
  },
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  "& .MuiListItemText-primary": {
    fontSize: "2.4rem",
    fontWeight: 600,
    lineHeight: "3.2rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      lineHeight: "2.8rem",
    },
  },
  "& .MuiListItemText-secondary": {
    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
  },
}))

// const StyledButton = styled(Button)(({ theme }) => ({}))

const BadgeItem = ({ badge }) => {
  const { changeBadgeDetailDialog, changeSelectedBadge, userBadges, changeUpgradeDialog } = useCanvasStore()
  // const [loading, setLoading] = useState(false)
  // const userBadgesLength = userBadges.length

  // const checkEligibility = async () => {
  //   // const signer = await provider!.getSigner(0)
  //   // const originsV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, signer)
  //   // const tokenId = await originsV2Contract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
  //   // console.log("tokenId", tokenId)
  // }

  const handleBadge = async () => {
    changeSelectedBadge(badge)
    changeBadgeDetailDialog(BadgeDetailDialogType.MINT_WITH_BACK)
    changeUpgradeDialog(false)
  }

  useEffect(() => {
    // if (userBadges.length && loading) {
    //   changeSelectedBadge(userBadges[userBadges.length - 1])
    //   changeBadgeDetailDialog(BadgeDetailDialogType.MINTED)
    //   setLoading(false)
    // }
  }, [userBadges])

  return (
    <StyledListItem
      onClick={handleBadge}
      // secondaryAction={
      //   <StyledButton variant="outlined" color="tertiary" onClick={handleBadge}>
      //     Mint now
      //   </StyledButton>
      // }
    >
      <StyledListItemAvatar>
        <Img
          src={badge.image}
          placeholder="/imgs/canvas/badgePlaceholder.svg"
          style={{ fontSize: "8rem", borderRadius: "0.8rem", background: "transparent" }}
        ></Img>
      </StyledListItemAvatar>
      <StyledListItemText
        primary={badge.name}
        secondary={
          <Typography className="MuiListItemText-secondary">
            Issued by
            <Avatar
              variant="square"
              sx={{
                height: "2.4rem",
                width: "2.4rem",
                display: "inline-block",
                verticalAlign: "bottom",
                margin: "0 0.4rem 0 0.8rem",
                borderRadius: "2px",
              }}
              src={badge.issuer.logo}
            />
            {badge.issuer.name}
          </Typography>
        }
      />
    </StyledListItem>
  )
}

export default BadgeItem
