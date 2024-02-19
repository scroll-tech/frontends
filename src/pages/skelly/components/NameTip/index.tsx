import { Button } from "@mui/material"
import { styled } from "@mui/system"

import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  borderBottom: "0.2rem solid #85E0D1",
  background: "var(--Linear, linear-gradient(180deg, #262626 0%, rgba(16, 16, 16, 0.60) 100%))",
  backdropFilter: "blur(2px)",
  padding: "1.2rem 1.4rem",
  color: "#fff",
  "&:hover": {
    borderColor: "#101010",
    borderRadius: "0.8rem",
    borderBottom: "0.2rem solid #85E0D1",
    background: "var(--Linear, linear-gradient(180deg, #262626 0%, rgba(16, 16, 16, 0.60) 100%))",
    backdropFilter: "blur(2px)",
    padding: "1.2rem 1.4rem",
    color: "#fff",
  },
}))

const NameTip = () => {
  const { changeBadgeDetailDialog } = useSkellyStore()

  return <StyledButton onClick={() => changeBadgeDetailDialog(BadgeDetailDialogTpye.VIEW)}>Scroll Origins NFT Badge</StyledButton>
}

export default NameTip
