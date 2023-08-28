import { isMobileOnly } from "react-device-detect"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"

const JoinTeam = () => {
  return (
    <SectionWrapper round full sx={{ pt: ["5.4rem", "15.4rem"], pb: ["6rem", "16rem"], backgroundColor: "themeBackground.normal" }}>
      <Stack direction="column" spacing={isMobileOnly ? "2.8rem" : "4.8rem"} alignItems="center">
        <Typography sx={{ fontSize: ["3.2rem", "4.8rem"], fontWeight: 500 }}>Join the Scroll team!</Typography>
        <Button href="/join-us" color="primary">
          Careers
        </Button>
      </Stack>
    </SectionWrapper>
  )
}

export default JoinTeam
