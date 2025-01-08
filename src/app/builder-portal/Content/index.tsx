import { Box, Container, Stack } from "@mui/material"

import ContentSection from "./ContentSection"
import BUILDER_PORTAL_DATA from "./data"

const BuilderPortalContent = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: ["2.4em", "6rem"] }}>
      <Container>
        <Stack direction="column" gap={["2.4rem", "4.8rem"]}>
          {BUILDER_PORTAL_DATA.map((item, index) => (
            <ContentSection key={item.title} {...item} index={index + 1}></ContentSection>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default BuilderPortalContent
