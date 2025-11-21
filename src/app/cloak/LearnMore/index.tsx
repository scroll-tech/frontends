"use client"

import { Box, Container } from "@mui/material"

import Button from "@/components/Button"
import { CLOAK_HERO_LINKS } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

const LearnMore = () => {
  const { isMobile } = useCheckViewport()
  return (
    <Box sx={{ backgroundColor: "themeBackground.highlight", py: "5.6rem" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button size={isMobile ? "small" : "medium"} whiteButton href={CLOAK_HERO_LINKS[0].href} className="!w-[280px] md:!w-[340px]">
          Learn more about Cloak’s design
        </Button>
      </Container>
    </Box>
  )
}
export default LearnMore
