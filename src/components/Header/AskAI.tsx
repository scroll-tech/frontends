import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useRef } from "react"

import { ButtonBase } from "@mui/material"

import useGlobalStore from "@/stores/globalStore"

const AskAI = props => {
  const { isMobile } = props
  const { aiModalVisible, changeAIModalVisible } = useGlobalStore()
  const aiDurationRef = useRef<number>(null)

  useEffect(() => {
    if (aiModalVisible) {
      aiDurationRef.current = Date.now()
    } else {
      if (aiDurationRef.current) {
        const duration = Date.now() - aiDurationRef.current
        sendGAEvent("event", "ai_modal_duration", { duration })
        aiDurationRef.current = null // reset the start time
      }
    }
  }, [aiModalVisible])

  const handleToggleAIModal = () => {
    if (aiModalVisible) {
      changeAIModalVisible(false)
    } else {
      changeAIModalVisible(true)
      sendGAEvent("event", "click_ask_ai")
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
