import { ButtonBase } from "@mui/material"

import useGlobalStore from "@/stores/globalStore"

const AskAI = props => {
  const { isMobile } = props
  const { aiModalVisible, changeAIModalVisible } = useGlobalStore()

  const handleToggleAIModal = () => {
    if (aiModalVisible) {
      changeAIModalVisible(false)
    } else {
      changeAIModalVisible(true)
    }
  }

  return (
    <ButtonBase
      sx={{
        color: "text.primary",
        fontSize: "1.6rem",
        lineHeight: "2.4rem",
        p: "0.8rem 1.6rem",
        bgcolor: "background.default",
        whiteSpace: "nowrap",
        borderRadius: isMobile ? "0.5rem" : "0.8rem",
      }}
      onClick={handleToggleAIModal}
    >
      Ask Scroll AI
    </ButtonBase>
  )
}

export default AskAI
