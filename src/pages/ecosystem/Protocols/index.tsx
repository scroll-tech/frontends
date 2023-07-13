import { useRef, useState } from "react"

import { MenuItem, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import Select from "@/components/Select"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"

import Gallery from "../Gallery"

const Protocals = props => {
  const [category, setCategory] = useState("All categories")

  const allCategories = useRef(["All categories", ...Object.keys(DIVERGENT_CATEGORY_MAP)])

  const handleChangeCategory = e => {
    setCategory(e.target.value)
  }
  return (
    <SectionWrapper maxWidth="1438px">
      <SectionHeader
        title="All protocols"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut urna iaculis quam mollis consequat."
        action={
          <Button href="" target="_blank" color="primary">
            Looking for a dapp?
          </Button>
        }
      ></SectionHeader>
      <Select value={category} onChange={handleChangeCategory} sx={{ mb: "3rem" }}>
        {allCategories.current.map(item => (
          <MenuItem key={item} value={item} sx={{ pl: "5rem", py: "0.5rem" }}>
            <Typography sx={{ fontSize: "2rem", lineHeight: "3.5rem" }}>{item}</Typography>
          </MenuItem>
        ))}
      </Select>
      <Gallery selectedCategory={category}></Gallery>
    </SectionWrapper>
  )
}

export default Protocals
