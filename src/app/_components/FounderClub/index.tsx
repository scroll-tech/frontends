import { Box, Container, Typography } from "@mui/material"

import Button from "@/components/Button"

import Protocols from "./Protocols"

const FounderClub = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: ["5.6rem", "8.9rem"] }}>
      <Typography sx={{ fontSize: ["2.8rem", "3.6rem"], lineHeight: ["4.4rem", "5.2rem"], textAlign: "center", typography: "title" }}>
        Scale on a performant network
        <br className="hidden sm:inline" /> built for founders
      </Typography>
      <Protocols />
      <Container>
        <Box sx={{ mt: ["3.2rem", "8.1rem"], mb: ["4rem", "8.1rem"] }}>TODO</Box>
        <Button color="primary" className="!w-[240px] md:!w-[250px] md:mx-auto">
          Join Founders’ club
        </Button>
      </Container>
    </Box>
  )
}

export default FounderClub
