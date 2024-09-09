import { useState } from "react"

import { Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"
import { COMMUNITY_REGION_LIST, COMMUNITY_TIME_LIST } from "@/constants/community"

import List from "./List"
import RegionSelect from "./RegionSelect"
import TimeSelect from "./TimeSelect"

const Join = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    time: COMMUNITY_TIME_LIST[0],
    region: COMMUNITY_REGION_LIST[0],
  })

  const handleChangeTime = value => {
    setSearchParams(pre => ({
      ...pre,
      page: 1,
      time: value,
    }))
  }

  const handleChangeRegion = value => {
    setSearchParams(pre => ({
      ...pre,
      page: 1,
      region: value,
    }))
  }

  const handleChangePage = () => {
    setSearchParams(pre => ({
      ...pre,
      page: pre.page + 1,
    }))
  }

  return (
    <SectionWrapper sx={{ pb: ["10rem", "4.8rem"], pt: ["4rem", "4rem", "6rem"] }}>
      <Stack direction={["column", "row"]} justifyContent="space-between" alignItems={["flex-start", "center"]} gap="2rem">
        <Typography sx={{ fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}>All Events</Typography>
        <Stack direction="row" gap="1.5rem">
          <TimeSelect value={searchParams.time} onChange={handleChangeTime} />
          <RegionSelect value={searchParams.region} onChange={handleChangeRegion} />
        </Stack>
      </Stack>
      <List searchParams={searchParams} onAddPage={handleChangePage} />
    </SectionWrapper>
  )
}

export default Join
