import { ReactNode } from "react"
import "swiper/css"
import "swiper/css/pagination"

import { Box } from "@mui/material"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import "./global"

export default function RootTemplate({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header></Header>
      {children}
      <Footer />
    </Box>
  )
}
