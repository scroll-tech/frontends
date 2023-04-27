import React, { useEffect, useState } from "react"

import { ArrowUpward } from "@mui/icons-material"
import { Box, Fab } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledFab = styled(Fab)(({ theme }) => ({
  "&:hover": {
    background: theme.palette.primary.light,
  },
}))

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
          <StyledFab color="primary" onClick={scrollToTop}>
            <ArrowUpward />
          </StyledFab>
        </Box>
      )}
    </>
  )
}

export default ScrollToTop
