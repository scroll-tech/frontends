import { List } from "@mui/material"
import { styled } from "@mui/system"

import useCanvasStore from "@/stores/canvasStore"

import Dialog from "../../components/Dialog"
import Empty from "../../components/Empty"
import BadgeItem from "./BadgeItem"

const StyledList = styled(List)(({ theme }) => ({
  width: "57.6rem",
  height: "62.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  padding: "2.4rem 0 0",
  overflowY: "auto",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(209, 205, 204, 0.30)",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",

  "& .MuiListItem-root": {
    gap: "1.6rem",
  },
}))

const UpgradeDialog = props => {
  const { badges } = props
  const { upgradeDialogVisible, changeUpgradeDialog } = useCanvasStore()

  const handleClose = () => {
    changeUpgradeDialog(false)
  }

  if (!badges.length) {
    return (
      <Dialog onClose={handleClose} open={upgradeDialogVisible}>
        <Empty title="No eligible badges for minting" sx={{ width: "57.6rem", height: "62.7rem" }}></Empty>
      </Dialog>
    )
  }

  return (
    <Dialog title="Badges for mint" open={upgradeDialogVisible} onClose={handleClose}>
      <StyledList>
        {badges.map((badge, index) => (
          <BadgeItem key={index} badge={badge} />
        ))}
      </StyledList>
    </Dialog>
  )
}

export default UpgradeDialog
