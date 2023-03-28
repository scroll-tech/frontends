import React, { useEffect, useState } from "react"

import { ArrowUpward } from "@mui/icons-material"
import { Box, Fab } from "@mui/material"

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const checkScrollPosition = () => {
    if (window.pageYOffset > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition)
    return () => {
      window.removeEventListener("scroll", checkScrollPosition)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {visible && (
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 100,
          }}
        >
          <Fab color="primary" onClick={scrollToTop}>
            <ArrowUpward />
          </Fab>
        </Box>
      )}
    </>
  )
}

export default ScrollToTop
