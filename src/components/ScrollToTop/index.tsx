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

  // the redesigned landing pages use a minimal circle-arrow button instead of the orange fab
  const isCompassRoute = ["/", "/privacy-policy", "/terms-of-service", "/app-privacy-policy"].includes(pathname)

  const checkScrollPosition = () => {
    // Glen's scroll.html (2026-09-10) shows its back-to-top once 80% of a screen has gone by
    const threshold = isCompassRoute ? window.innerHeight * 0.8 : 300
    setVisible(window.scrollY > threshold)
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

  if (isCompassRoute) {
    // Glen's back-to-top (scroll.html, 2026-09-10): a 44px frosted disc at the corner that
    // fades and rises in once 80% of a screen has gone by, instead of popping in and out
    return (
      <button
        type="button"
        aria-label="Back to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        onClick={scrollToTop}
        className={`fixed bottom-[clamp(16px,3vw,32px)] right-[clamp(16px,3vw,32px)] z-[55] grid size-[44px] place-items-center rounded-full border border-solid border-[#E5E1DC] bg-white/90 text-[#4A4845] shadow-[0_8px_26px_-12px_rgba(46,27,112,0.35)] backdrop-blur-[14px] transition-[opacity,transform,visibility,color] duration-[450ms] ease-[cubic-bezier(.22,.61,.36,1)] hover:text-[#0A0A0A] ${
          visible ? "translate-y-0 opacity-100" : "invisible translate-y-[10px] opacity-0"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
        </svg>
      </button>
    )
  }

  if (!visible) {
    return null
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
