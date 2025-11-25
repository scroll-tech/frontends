"use client"

import { Box, Container } from "@mui/material"

import Button from "@/components/Button"
import { CLOAK_SIGNUP_URL } from "@/constants"
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
        <Button target="_blank" width="250px" whiteButton href={CLOAK_SIGNUP_URL}>
          Sign up for demo
        </Button>
      </Container>
    </Box>
  )
}
export default LearnMore
