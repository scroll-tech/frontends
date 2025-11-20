import { Box, Container } from "@mui/material"

import Button from "@/components/Button"
import { CLOAK_HERO_LINKS } from "@/constants"

const LearnMore = () => {
  return (
    <Box sx={{ backgroundColor: "themeBackground.brand", py: "6rem" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button size="small" whiteButton href={CLOAK_HERO_LINKS[0].href} className="!w-[280px]">
          Learn more about Cloak’s design
        </Button>
      </Container>
    </Box>
  )
}
export default LearnMore
