import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react"

import { Box } from "@mui/material"

const MotionBox = motion(Box)
const FeedbackAlert = props => {
  const { sx, open, duration, children, onClose } = props

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration || 2e3) // Auto close after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          sx={{
            borderRadius: "0.4rem",
            backgroundColor: "#101010",
            color: "#fff",
            fontSize: "1.2rem",
            padding: "0.4rem 1.2rem",

            ...sx,
          }}
        >
          {children}
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default FeedbackAlert
