import clsx from "clsx"
import { useEffect, useRef } from "react"

import { Box } from "@mui/material"

import SpinSvg from "@/assets/svgs/header/spin.svg"

import AssistantMessage from "./AssistantMessage"
import UserMessage from "./UserMessage"

const MessagePanel = props => {
  const { data, loading } = props

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [data])

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: ["1.6rem 2rem 0", "1.6rem 1.6rem 0"],
        scrollbarColor: "#ececec transparent",
        scrollbarWidth: "thin",
      }}
    >
      <Box component="ul">
        {data.map(message => (
          <Box component="li" key={message.id}>
            {message.type === "input_text" ? <UserMessage>{message.text}</UserMessage> : <AssistantMessage>{message.text}</AssistantMessage>}
          </Box>
        ))}
      </Box>
      <SpinSvg className={clsx(loading ? "visible mb-[1.6rem]" : "invisible")} />
      <div ref={bottomRef}></div>
    </Box>
  )
}

export default MessagePanel
