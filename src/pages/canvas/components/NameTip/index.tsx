import { Button } from "@mui/material"
import { styled } from "@mui/system"

import useCanvasStore, { BadgeDetailDialogTpye } from "@/stores/canvasStore"

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.8rem",
  borderBottom: "0.2rem solid #85E0D1",
  background: "var(--Linear, linear-gradient(180deg, #262626 0%, #111 100%))",
  backdropFilter: "blur(2px)",
  padding: "1.2rem 1.6rem",
  color: "#fff",
  height: "unset",

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

const NameTip = ({ metadata }) => {
  const { changeBadgeDetailDialog } = useCanvasStore()

  return <StyledButton onClick={() => changeBadgeDetailDialog(BadgeDetailDialogTpye.VIEW)}>{metadata?.name}</StyledButton>
}

export default NameTip
