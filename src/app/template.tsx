import { ReactNode } from "react"
import "swiper/css"
import "swiper/css/pagination"

import { Box } from "@mui/material"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import useHideFooter from "@/hooks/useHideFooter"
import { isSepolia } from "@/utils"

import "./global"

export default function RootTemplate({ children }: { children: ReactNode }) {
  const hideFooter = useHideFooter()

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header></Header>
      {children}
      {!(isSepolia || hideFooter) && <Footer />}
    </Box>
  )
}
