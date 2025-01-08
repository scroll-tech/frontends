"use client"

import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

import { Box, Snackbar, Stack, Typography } from "@mui/material"

import BulbSvg from "@/assets/svgs/builder-portal/bulb.svg"
import CloseSvg from "@/assets/svgs/builder-portal/close.svg"

export interface SnackbarMessage {
  text: string
  key: number
}

const DeveloperTip = forwardRef((props, ref) => {
  const { ...restProps } = props

  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<SnackbarMessage | undefined>(undefined)

  useImperativeHandle(ref, () => ({
    displayMessage: (text: string) => {
      setSnackPack(prev => [...prev, { text, key: Date.now() }])
    },
  }))

  useEffect(() => {
    if (snackPack.length && !message) {
      // Set a new snack when we don't have an active one
      setMessage({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && message && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [snackPack, message, open])

  const handleExited = () => {
    setMessage(undefined)
  }

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      {...restProps}
      sx={{
        left: "unset",
        right: ["2rem", "6rem"],
        bottom: ["1.6rem", "5rem"],
        width: ["calc(100% - 4rem)", "47.5rem"],
      }}
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={8000}
      TransitionProps={{ onExited: handleExited }}
      onClose={handleClose}
    >
      <Box
        sx={{
          backgroundColor: "rgb(250,253,215)",
          borderRadius: "2.4rem",
          p: "3rem",
          position: "relative",
        }}
      >
        <Stack key={message?.key} direction="row" spacing="0.8rem">
          <BulbSvg className="w-[2rem] sm:w-[2.4rem] aspect-square"></BulbSvg>
          <Typography sx={{ fontSize: ["1.4rem", "2rem"], lineHeight: "2.6rem", fontWeight: 500 }}>Portal Builder Tip</Typography>
        </Stack>
        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: "2.2rem", mt: "0.8rem" }}>{message?.text}</Typography>
        <CloseSvg
          className="w-[1.2rem] h-auto absolute top-[2rem] right-[2rem] sm:top-[2.4rem] sm:right-[2.4rem]"
          role="button"
          onClick={handleClose}
        ></CloseSvg>
      </Box>
    </Snackbar>
  )
})

export default DeveloperTip
