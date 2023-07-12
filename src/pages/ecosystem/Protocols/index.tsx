import { useRef, useState } from "react"

import { Box, Container, MenuItem, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import Select from "@/components/Select"
import { DIVERGENT_CATEGORY_MAP } from "@/constants"

import Gallery from "../Gallery"

const Protocals = props => {
  const [category, setCategory] = useState()

  const allCategories = useRef(Object.keys(DIVERGENT_CATEGORY_MAP))

  const handleChangeCategory = e => {
    setCategory(e.target.value)
  }
  return (
    <Box sx={{ background: "#FFF8F3" }}>
      <Container sx={{ pt: "15.4rem", maxWidth: "1438px !important" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: "12rem" }}>
          <Stack direction="column">
            <Typography sx={{ fontSize: "4.6rem", lineHeight: "5rem", fontWeight: 500, mb: "2.4rem" }}>All protocols</Typography>
            <Typography sx={{ fontSize: "2.4rem", lineHeight: "3rem" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing <br></br>elit. Proin ut urna iaculis quam mollis consequat.
            </Typography>
          </Stack>
          <Button href="" target="_blank">
            Looking for a dapp?
          </Button>
        </Stack>
        <Select value={category} onChange={handleChangeCategory} sx={{ mb: "3rem" }}>
          {allCategories.current.map(item => (
            <MenuItem key={item} value={item} sx={{ pl: "5rem", py: "0.5rem" }}>
              <Typography sx={{ fontSize: "2rem", lineHeight: "3.5rem" }}>{item}</Typography>
            </MenuItem>
          ))}
        </Select>
        <Gallery selectedCategory={category}></Gallery>
      </Container>
    </Box>
  )
}

export default Protocals
