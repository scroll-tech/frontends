import { useState } from "react"

import { Box, IconButton, Stack, Tooltip } from "@mui/material"

import CheckedSvg from "@/assets/svgs/header/checked.svg"
import CopySvg from "@/assets/svgs/header/copy.svg"
import ReSendSvg from "@/assets/svgs/header/re-send.svg"
import ThumbDownSvg from "@/assets/svgs/header/thumb-down.svg"
import ThumbUpSvg from "@/assets/svgs/header/thumb-up.svg"

const Operation = props => {
  const { sx, feedback, message, onRetry, onThumbUp, onThumbDown } = props
  const [tip, setTip] = useState<string>("")

  const [copied, setCopied] = useState<boolean>(false)

  const operations = [
    {
      icon: copied ? CheckedSvg : CopySvg,

      tooltip: "Copy",
      onClick: () => {
        navigator.clipboard.writeText(message)
        setCopied(true)
        setTip("Copied")
        setTimeout(() => {
          setCopied(false)
          setTip("")
        }, 2e3)
      },
    },
    {
      icon: ThumbUpSvg,
      hidden: feedback === "bad",
      tooltip: "Good Response",
      disabled: feedback === "good",
      onClick: () => {
        onThumbUp?.()
      },
    },
    {
      icon: ThumbDownSvg,
      hidden: feedback === "good",
      tooltip: "Bad Response",
      disabled: feedback === "bad",
      onClick: () => {
        onThumbDown?.()
      },
    },
    {
      icon: ReSendSvg,
      tooltip: "Try Again",
      onClick: () => {
        onRetry?.()
      },
    },
  ]

  return (
    <Box sx={{ position: "relative", ...sx }}>
      <Stack direction="row" gap="1.6rem">
        {operations
          .filter(({ hidden }) => !hidden)
          .map(({ icon: Icon, tooltip, disabled, onClick }, index) => (
            <Tooltip
              key={index}
              title={tip || tooltip}
              placement="bottom"
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    borderRadius: "0.4rem",
                    fontSize: "1.2rem",
                    lineHeight: "1.6rem",
                    padding: "0.4rem 0.8rem",
                    backgroundColor: "text.primary",
                    marginTop: "0.8rem",
                    "& .MuiTooltip-arrow": {
                      color: "#101010",
                    },
                  },
                },
              }}
            >
              <IconButton
                sx={{
                  p: 0,
                  color: "#10101099",
                  "&:hover": {
                    color: "text.primary",
                    backgroundColor: "unset",
                  },
                  height: "2rem",
                  width: "2rem",
                }}
                disabled={disabled}
                onClick={onClick}
              >
                <Icon></Icon>
              </IconButton>
            </Tooltip>
          ))}
      </Stack>
    </Box>
  )
}

export default Operation
