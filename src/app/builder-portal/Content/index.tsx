import { Box, Container, Stack } from "@mui/material"

import ContentSection from "./ContentSection"
import BUILDER_PORTAL_DATA from "./data"

const BuilderPortalContent = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: "6rem" }}>
      <Container>
        <Stack direction="column" spacing="4.8rem">
          {BUILDER_PORTAL_DATA.map(item => (
            <ContentSection key={item.title} {...item}></ContentSection>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default BuilderPortalContent
