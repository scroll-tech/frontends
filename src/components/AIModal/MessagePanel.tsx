import { sendGAEvent } from "@next/third-parties/google"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

import { Box } from "@mui/material"

import SpinSvg from "@/assets/svgs/header/spin.svg"

import AssistantMessage from "./AssistantMessage"
import FeedbackAlert from "./FeedbackAlert"
import UserMessage from "./UserMessage"

const MessagePanel = props => {
  const { data, fetching, streaming, onRetry, onUpdateData } = props

  const [feedbackAlertVisible, setFeedbackAlertVisible] = useState(false)
  // Reference to the bottom of the message panel for auto-scrolling
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [data[data.length - 1]?.text])

  if (!data || data.length === 0) {
    return null
  }

  const handleThumbUp = id => {
    setFeedbackAlertVisible(true)
    onUpdateData({ id, feedback: "good" })

    const messageIndex = data.findIndex(message => message.id === id)

    sendGAEvent("event", "click_ai_feedback", {
      label: data[messageIndex - 1].text,
      id,
      feedback: "good",
    })
  }

  const handleThumbDown = id => {
    setFeedbackAlertVisible(true)
    onUpdateData({ id, feedback: "bad" })

    const messageIndex = data.findIndex(message => message.id === id)

    sendGAEvent("event", "click_ai_feedback", {
      label: data[messageIndex - 1].text,
      id,
      feedback: "bad",
    })
  }
  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        overflowY: "auto",
        padding: ["1.6rem 2rem 0", "1.6rem 1.6rem 0"],
        scrollbarColor: "#ececec transparent",
        scrollbarWidth: "thin",
      }}
    >
      <Box component="ul">
        {data.map((message, index) => (
          <Box component="li" key={message.id}>
            {message.type === "input_text" ? (
              <UserMessage>{message.text}</UserMessage>
            ) : message.text ? (
              <AssistantMessage
                allowOperation={!streaming && !fetching}
                isLast={index === data.length - 1}
                feedback={message.feedback}
                onThumbUp={() => handleThumbUp(message.id)}
                onThumbDown={() => handleThumbDown(message.id)}
                onRetry={() => onRetry(message.id)}
              >
                {message.text}
              </AssistantMessage>
            ) : null}
          </Box>
        ))}
      </Box>
      <SpinSvg className={clsx(fetching ? "visible mb-[1.6rem]" : "invisible")} />
      <div ref={bottomRef}></div>

      <Box sx={{ position: "absolute", top: "2.4rem", left: "50%", transform: "translateX(-50%)" }}>
        <FeedbackAlert open={feedbackAlertVisible} duration={5e3} onClose={() => setFeedbackAlertVisible(false)}>
          Thanks for your feedback!
        </FeedbackAlert>
      </Box>
    </Box>
  )
}

export default MessagePanel
