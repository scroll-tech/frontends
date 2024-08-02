import { useState } from "react"

import { Stack } from "@mui/material"

import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import SearchInput from "@/pages/ecosystem/Protocols/SeachInput"

const Badges = () => {
  const [keyword, setKeyword] = useState()

  const handleChangeKeyword = e => {
    setKeyword(e.target.value)
  }

  return (
    <SectionWrapper dark>
      <SectionHeader
        dark
        title="Discover Badges"
        action={
          <Stack direction="row">
            <SearchInput value={keyword} onChange={handleChangeKeyword}></SearchInput>
          </Stack>
        }
      ></SectionHeader>
    </SectionWrapper>
  )
}

export default Badges
