import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"
import { styled } from "@mui/system"

import PageHeader from "@/components/PageHeader"

import Avatars from "./avatars"
import Photowall from "./photowall"

const TeamContainer = styled(Box)(
  ({ theme }) => `
        margin: 0 auto 14rem;
        ${theme.breakpoints.down("md")} {
          margin: 0 0 8rem; 
        };
      `,
)

const TitleTypography = styled(Typography)(
  ({ theme }) => `
      text-align: center;
      margin-bottom: 1.4rem; 
      `,
)

const Team = () => {
  const navigate = useNavigate()

  return (
    <TeamContainer>
      <PageHeader
        title="Join Scroll and work with the best"
        subTitle="Scroll is a globally distributed team. We are united in our goal to improve Ethereum while maintaining decentralization and transparency.
          Join our team to work with experts in zero-knowledge cryptography and distributed systems on cutting edge technology."
      >
        <Button variant="contained" onClick={() => navigate("/join-us")} sx={{ margin: "3rem auto 6rem" }}>
          View Open Positions
        </Button>
      </PageHeader>
      <Avatars />

      <Photowall />

      <TitleTypography variant="h1">Sound like a good fit?</TitleTypography>
      <Button variant="contained" onClick={() => navigate("/join-us")} sx={{ display: "table", margin: "0 auto" }}>
        View Open Positions
      </Button>
    </TeamContainer>
  )
}

export default Team
