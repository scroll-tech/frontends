"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

import { ArrowUpward } from "@mui/icons-material"
import { Box, Fab } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledFab = styled(Fab)(({ theme }) => ({
  "&:hover": {
    background: theme.vars.palette.primary.light,
  },
}))

const ScrollToTop: React.FC = () => {
  const pathname = usePathname()
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

  // the redesigned landing pages use a minimal circle-arrow button instead of the orange fab
  const isCompassRoute = ["/", "/privacy-policy", "/terms-of-service", "/app-privacy-policy"].includes(pathname)

  if (!visible) {
    return null
  }

  if (isCompassRoute) {
    return (
      <button
        type="button"
        aria-label="scroll to top"
        onClick={scrollToTop}
        className="fixed bottom-[30px] right-[30px] z-[100] flex size-[40px] items-center justify-center rounded-full border border-solid border-[#959595] bg-white text-[#959595] shadow-[0px_4px_12px_rgba(0,0,0,0.06)] transition-colors hover:border-black hover:text-black"
      >
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9.5004V2.4996M2.4996 6L6 2.4996L9.5004 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    )
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 100,
      }}
    >
      <StyledFab color="primary" aria-label="scroll to top" onClick={scrollToTop}>
        <ArrowUpward />
      </StyledFab>
    </Box>
  )
}

export default ScrollToTop
