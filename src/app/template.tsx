"use client"

import React, { useEffect } from "react"
import "swiper/css"
import "swiper/css/pagination"

import { Box } from "@mui/material"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import useCheckTheme from "@/components/Header/useCheckTheme"
import useHideFooter from "@/hooks/useHideFooter"
import { isSepolia } from "@/utils"

import "./global"

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const dark = useCheckTheme()
  const hideFooter = useHideFooter()

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
    setVh()
    window.addEventListener("resize", setVh)
    return () => {
      window.removeEventListener("resize", setVh)
    }
  }, [])

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dark ? "themeBackground.dark" : "themeBackground.light" }}>
      <Header></Header>
      {children}
      {!(isSepolia || hideFooter) && <Footer />}
    </Box>
  )
}
