import ImageIcon from "@mui/icons-material/Image"
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "100%",
  padding: "0",
  "& .MuiListItemSecondaryAction-root": {
    right: "0",
  },
}))

const StyledListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
  "& .MuiAvatar-root": {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#000",
  },
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "2.4rem",
    fontWeight: 600,
    lineHeight: "3.2rem",
    color: "#fff",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    color: "#fff",
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  border: "0.15rem solid #fff",
  display: "flex",
  width: "16rem",
  height: "4.8rem",
  padding: "0.8rem 2.4rem",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.8rem",
  flexShrink: 0,
  flexWrap: "wrap",
  fontSize: "1.8rem",
  fontWeight: 600,
  backgroundColor: "transparent",
  color: "#fff",
}))

const BadgeItem = ({ badge }) => {
  const { changeBadgeDetailDialog } = useSkellyStore()
  const { mintBadge } = useSkellyContext()

  // const checkEligibility = async () => {
  //   // const signer = await provider!.getSigner(0)
  //   // const originsV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, signer)
  //   // const tokenId = await originsV2Contract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
  //   // console.log("tokenId", tokenId)
  // }

  const handleBadge = async () => {
    await mintBadge(badge.nftAddress, badge.nftAbi, badge.badgeAddress)
    changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
  }

  return (
    <StyledListItem secondaryAction={<StyledButton onClick={handleBadge}>Mint now</StyledButton>}>
      <StyledListItemAvatar>
        <Avatar sx={{ fontSize: "8rem" }}>
          <ImageIcon />
        </Avatar>
      </StyledListItemAvatar>
      <StyledListItemText
        primary={badge.name}
        secondary={
          <Typography className="MuiListItemText-secondary">
            Issued by
            <ImageIcon />
            {badge.issuer.name}
          </Typography>
        }
      />
    </StyledListItem>
  )
}

export default BadgeItem
