import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ExplorerCard from "./ExplorerCard"

const Explorer = () => {
  return (
    <SectionWrapper
      full
      sx={{ display: "flex", flexDirection: ["column", "row"], gap: ["2rem", "3rem"], pb: ["12rem", "16rem"], pt: ["11.8rem", "16.3rem"] }}
    >
      {ECOSYSTEM_EXPLORER_LIST.map(item => (
        <ExplorerCard key={item.title} {...item}></ExplorerCard>
      ))}
    </SectionWrapper>
  )
}

export default Explorer
