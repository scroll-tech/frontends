import { IconButton, Stack, TextareaAutosize } from "@mui/material"

import SendSvg from "@/assets/svgs/header/send.svg"

const AIInput = props => {
  const { disabled, onChat, ...restProps } = props

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      onChat()
    }
  }

  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: "2.8rem",
        border: disabled ? "2px solid #1010101A" : "2px solid #101010",
        p: "0.6rem",
        gap: "1.6rem",
        alignItems: "center",
      }}
    >
      <TextareaAutosize
        maxRows={4}
        placeholder="Message"
        autoFocus
        style={{
          fontSize: "1.6rem",
          lineHeight: "2.4rem",
          border: "none",
          outline: "none",
          resize: "none",
          width: "100%",
          paddingLeft: "1.6rem",
          scrollbarColor: "#ececec transparent",
          scrollbarWidth: "thin",
        }}
        {...restProps}
        onKeyDown={handleKeyDown}
      ></TextareaAutosize>
      <IconButton sx={{ p: 0, opacity: disabled ? "0.4" : "1" }} aria-label="Enter" onClick={onChat}>
        <SendSvg></SendSvg>
      </IconButton>
    </Stack>
  )
}

export default AIInput
