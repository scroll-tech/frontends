import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"

const JoinTeam = () => {
  return (
    <SectionWrapper round full sx={{ pt: "15.4rem", pb: "16rem", backgroundColor: "themeBackground.normal" }}>
      <Stack direction="column" spacing="5rem" alignItems="center">
        <Typography sx={{ fontSize: ["3.2rem", "4.8rem"], fontWeight: 500 }}>Join the Scroll team!</Typography>
        <Button href="/join-us" color="primary" width="18rem">
          Career
        </Button>
      </Stack>
    </SectionWrapper>
  )
}

export default JoinTeam
