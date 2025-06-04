import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Box } from "@mui/material"

import Operation from "./Operation"

const AssistantMessage = props => {
  const { children, feedback, allowOperation, isLast, onRetry, onThumbUp, onThumbDown } = props

  const [operationVisible, setOperationVisible] = useState<boolean>(false)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOperationVisible(true)
  }

  const handlePopoverClose = () => {
    setOperationVisible(false)
  }

  return (
    <>
      <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <ReactMarkdown
          children={children as string}
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          }}
          className="assistant-message"
        />
        <Box sx={{ height: "2rem", marginTop: "-0.4rem", marginBottom: "1.6rem" }}>
          <Operation
            visible={allowOperation && (isLast || operationVisible)}
            message={children as string}
            feedback={feedback}
            onThumbUp={onThumbUp}
            onThumbDown={onThumbDown}
            onRetry={onRetry}
          ></Operation>
        </Box>
      </Box>
    </>
  )
}

export default AssistantMessage
