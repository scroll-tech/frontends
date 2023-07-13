import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ExplorerCard from "./ExplorerCard"

const Explorer = () => {
  return (
    <SectionWrapper maxWidth="1438px" sx={{ display: "flex", gap: "3rem", pb: "16rem" }}>
      {ECOSYSTEM_EXPLORER_LIST.map(item => (
        <ExplorerCard key={item.title} {...item}></ExplorerCard>
      ))}
    </SectionWrapper>
  )
}

export default Explorer
