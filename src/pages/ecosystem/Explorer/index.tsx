import { Box, Container } from "@mui/material"

import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ExplorerCard from "./ExplorerCard"

const Explorer = () => {
  return (
    <Box sx={{ background: "#FFF8F3" }}>
      <Container sx={{ pt: "15.4rem", pb: "16rem", maxWidth: "1438px !important", display: "flex", gap: "3rem" }}>
        {ECOSYSTEM_EXPLORER_LIST.map(item => (
          <ExplorerCard key={item.title} {...item}></ExplorerCard>
        ))}
      </Container>
    </Box>
  )
}

export default Explorer
