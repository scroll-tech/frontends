import { useEffect, useState } from "react"

import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import Button from "@/pages/skelly/components/Button"
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

const StyledButton = styled(Button)(({ theme }) => ({}))

const BadgeItem = ({ badge }) => {
  const { changeBadgeDetailDialog, changeSelectedBadge } = useSkellyStore()
  const { mintBadge, queryUserBadgesWrapped, userBadges } = useSkellyContext()
  const [loading, setLoading] = useState(false)
  // const userBadgesLength = userBadges.length

  // const checkEligibility = async () => {
  //   // const signer = await provider!.getSigner(0)
  //   // const originsV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, signer)
  //   // const tokenId = await originsV2Contract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
  //   // console.log("tokenId", tokenId)
  // }

  const handleBadge = async () => {
    setLoading(true)
    const result = await mintBadge(badge.nftAddress, badge.nftAbi, badge.badgeAddress)
    if (result! !== true) {
      console.log("mintBadge failed")
      setLoading(false)
    } else {
      queryUserBadgesWrapped()
    }
  }

  useEffect(() => {
    if (userBadges.length && loading) {
      changeSelectedBadge(userBadges[userBadges.length - 1])
      changeBadgeDetailDialog(BadgeDetailDialogTpye.MINTED)
      setLoading(false)
    }
  }, [userBadges])

  return (
    <StyledListItem
      secondaryAction={
        <StyledButton loading={loading} color="dark" onClick={handleBadge}>
          Mint now
        </StyledButton>
      }
    >
      <StyledListItemAvatar>
        <Avatar src={badge.image} sx={{ fontSize: "8rem" }}></Avatar>
      </StyledListItemAvatar>
      <StyledListItemText
        primary={badge.name}
        secondary={
          <Typography className="MuiListItemText-secondary">
            Issued by
            <Avatar
              sx={{ height: "2.4rem", width: "2.4rem", display: "inline-block", verticalAlign: "bottom", margin: "0 0.8rem" }}
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
