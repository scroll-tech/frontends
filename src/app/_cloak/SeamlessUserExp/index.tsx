import { Stack } from "@mui/material"

import { CLOAK_USER_EXP_DESCS } from "@/constants/cloak"

import SectionWrapper from "../SectionWrapper"
import SeamlessCard from "./SeamlessCard"

const SeamlessUserExp = () => {
  return (
    <SectionWrapper title="Seamless User Experience" backgroundColor="themeBackground.light">
      <Stack direction="row" sx={{ justifyContent: "space-evenly", flexWrap: "wrap", gap: "3rem" }}>
        {CLOAK_USER_EXP_DESCS.map(({ key, imageURL, title, content }) => (
          <SeamlessCard key={key} imageURL={imageURL} title={title} content={content}></SeamlessCard>
        ))}
      </Stack>
    </SectionWrapper>
  )
}
export default SeamlessUserExp
