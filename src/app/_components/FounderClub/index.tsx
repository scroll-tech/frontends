import { Box, Container, Typography } from "@mui/material"

import Button from "@/components/Button"
import { FOUNDER_CLUB_URL } from "@/constants/link"

import Founders from "./Founders"
import Protocols from "./Protocols"

const FounderClub = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: ["5.6rem", "8.9rem"] }}>
      <Typography sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["4rem", "5.6rem"], textAlign: "center", typography: "title", px: "2rem" }}>
        Scale on a performant network
        <br className="hidden sm:inline" /> built for founders
      </Typography>
      <Protocols />
      <Container>
        <Founders />
        <Button color="primary" href={FOUNDER_CLUB_URL} target="_blank" className="!w-[240px] md:!w-[250px] md:mx-auto">
          Join Telegram group
        </Button>
      </Container>
    </Box>
  )
}

export default FounderClub
