"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_PAGE_SYMBOL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import HighlightList from "./HighlightList"

const Highlights = () => {
  const { isMobile, isTablet } = useCheckViewport()
  const hash = window.location.hash?.slice(1)
  const router = useRouter()

  useEffect(() => {
    if (hash) {
      const targetEl = document.getElementById(`${ECOSYSTEM_PAGE_SYMBOL}-${hash.slice(1)}`)
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
        })
      }
    }
  }, [hash])

  return (
    <SectionWrapper id={`${ECOSYSTEM_PAGE_SYMBOL}-highlights`} dark sx={{ pt: ["4rem", "5.5rem", "6rem"], pb: ["5rem"], background: "#101010" }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? "1.6rem" : "2rem"}
      >
        <Typography sx={{ color: "#fff", fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}>
          Ecosystem highlights
        </Typography>
        {isMobile ? null : (
          <Button width={isTablet ? "21.5rem" : "25rem"} onClick={() => router.push("/blog?category=Ecosystem highlights")} color="primary">
            Read more
          </Button>
        )}
      </Stack>
      <HighlightList />
    </SectionWrapper>
  )
}
export default Highlights
