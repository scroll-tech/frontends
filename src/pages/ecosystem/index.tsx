import { useState } from "react"

import { Box } from "@mui/material"

import Filter from "./Filter"
import Gallery from "./Gallery"
import Header from "./Header"

const Ecosystem = () => {
  const [category, setCategory] = useState("All")

  const handleChangeCategory = value => {
    setCategory(value)
  }

  return (
    <>
      <Header></Header>
      <Box
        sx={{
          position: "relative",
          maxWidth: "1160px",
          mx: "auto",
          px: "3rem",
        }}
      >
        <Filter value={category} onChange={handleChangeCategory}></Filter>
        <Gallery selectedCategory={category}></Gallery>
      </Box>
    </>
  )
}

export default Ecosystem
