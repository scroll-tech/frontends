import { Box, Container, Typography } from "@mui/material"

import Button from "@/components/Button"

import Protocols from "./Protocols"

const FounderClub = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: "8.9rem" }}>
      <Typography sx={{ fontSize: "3.6rem", lineHeight: "5.2rem", textAlign: "center" }}>
        Scale on a performant network
        <br /> built for founders
      </Typography>
      <Protocols />
      <Container sx={{ my: "8.1rem" }}>
        <Box>TODO</Box>
      </Container>
      <Button color="primary" className="!w-[250px] mx-auto">
        Join Founders’ club
      </Button>
    </Box>
  )
}

export default FounderClub
