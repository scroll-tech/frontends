import { useRef, useState } from "react"
import { isMobileOnly } from "react-device-detect"

import { MenuItem, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import Select from "@/components/Select"
import { DIVERGENT_CATEGORY_MAP, LOOKING_FOR_A_DAPP_LINK } from "@/constants"

import Gallery from "../Gallery"

const Protocals = props => {
  const [category, setCategory] = useState("All categories")

  const allCategories = useRef(["All categories", ...Object.keys(DIVERGENT_CATEGORY_MAP)])

  const handleChangeCategory = e => {
    setCategory(e.target.value)
  }
  return (
    <SectionWrapper sx={{ pt: ["6rem", "15.4rem"] }}>
      <SectionHeader
        title="Find your purpose with Scroll"
        content="Whatever the use case, we’re building for what’s next. Browse all protocols and discover new inspiration."
        action={
          <Button href={LOOKING_FOR_A_DAPP_LINK} target="_blank" color="primary" width={isMobileOnly ? "19.4rem" : "25rem"}>
            Request a Dapp
          </Button>
        }
      ></SectionHeader>
      <Select value={category} onChange={handleChangeCategory} sx={{ mb: "3rem", mt: ["12rem", "12.6rem"] }}>
        {allCategories.current.map(item => (
          <MenuItem key={item} value={item} sx={{ py: 0, minHeight: "auto" }}>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["3.5rem", "4.5rem"] }}>{item}</Typography>
          </MenuItem>
        ))}
      </Select>
      <Gallery selectedCategory={category}></Gallery>
    </SectionWrapper>
  )
}

export default Protocals
