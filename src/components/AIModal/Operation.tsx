import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { useState } from "react"

import { Box, IconButton, Stack, Tooltip } from "@mui/material"

import CheckedSvg from "@/assets/svgs/header/checked.svg"
import CopySvg from "@/assets/svgs/header/copy.svg"
import ReSendSvg from "@/assets/svgs/header/re-send.svg"
import ThumbDownSvg from "@/assets/svgs/header/thumb-down.svg"
import ThumbUpSvg from "@/assets/svgs/header/thumb-up.svg"

const MotionBox = motion(Box)

const MotionStack = motion(Stack)

const MotionIconButton = motion(IconButton)

const Operation = props => {
  const { sx, visible, feedback, message, onRetry, onThumbUp, onThumbDown } = props
  const [tip, setTip] = useState<string>("")

  const [copied, setCopied] = useState<boolean>(false)

  const operations = [
    {
      key: "copy",
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
      key: "thumbUp",
      icon: ThumbUpSvg,
      hidden: feedback === "bad",
      tooltip: "Good Response",
      disabled: feedback === "good",
      onClick: () => {
        onThumbUp?.()
      },
    },
    {
      key: "thumbDown",
      icon: ThumbDownSvg,
      hidden: feedback === "good",
      tooltip: "Bad Response",
      disabled: feedback === "bad",
      onClick: () => {
        onThumbDown?.()
      },
    },
    {
      key: "retry",
      icon: ReSendSvg,
      tooltip: "Try Again",
      onClick: () => {
        onRetry?.()
      },
    },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox sx={{ position: "relative", ...sx }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MotionStack direction="row" gap="1.6rem">
            <AnimatePresence>
              {operations
                .filter(({ hidden }) => !hidden)
                .map(({ icon: Icon, key, tooltip, disabled, onClick }) => (
                  <Tooltip
                    key={key}
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
                          marginTop: "0.8rem !important",
                          "& .MuiTooltip-arrow": {
                            color: "#101010",
                          },
                        },
                      },
                    }}
                  >
                    <MotionIconButton
                      key={key}
                      layout
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={key === "thumbUp" ? { opacity: 0, x: 0, y: -10 } : { opacity: 0, x: -10, y: 0 }}
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
                    </MotionIconButton>
                  </Tooltip>
                ))}
            </AnimatePresence>
          </MotionStack>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default Operation
