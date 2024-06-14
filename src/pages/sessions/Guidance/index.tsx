import { Container } from "@mui/material"

import { SESSIONS_EXPLORER_LIST } from "@/constants/sessions"

import GuidanceCard from "./GuidanceCard"

const Guidance = () => {
  return (
    <Container
      sx={{
        maxWidth: ["unset", "108rem !important"],
        display: "grid",
        gridTemplateColumns: ["1fr", "1fr 1fr 1fr"],
        gap: ["1.6rem", "2.4rem"],
      }}
    >
      {SESSIONS_EXPLORER_LIST.map(item => (
        <GuidanceCard key={item.title} {...item}></GuidanceCard>
      ))}
    </Container>
  )
}

export default Guidance
