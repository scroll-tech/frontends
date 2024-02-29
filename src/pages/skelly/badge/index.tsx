import { useState } from "react"

import LoadingPage from "@/components/LoadingPage"
import SectionWrapper from "@/components/SectionWrapper"

import Detail from "./Detail"

const BadgeDetail = () => {
  const [loading] = useState(false)
  const [isMinted] = useState(false)
  return (
    <SectionWrapper
      dark
      sx={{
        pt: ["2.4rem", isMinted ? "3.2rem" : "4rem", "8rem"],
        pb: ["8rem", "16rem"],
        minHeight: "calc(100vh - 6.5rem)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <>{loading ? <LoadingPage height="40rem"></LoadingPage> : <Detail />}</>
    </SectionWrapper>
  )
}

export default BadgeDetail
