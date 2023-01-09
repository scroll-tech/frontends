import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"
import { styled } from "@mui/system"

import WrapperBox from "@/components/WrapperBox"

import Avatars from "./avatars"
import Photowall from "./photowall"

const TeamContainer = styled(Box)(
  ({ theme }) => `
        margin: 14rem auto;
        ${theme.breakpoints.down("md")} {
          margin: 8rem 0; 
        };
      `,
)

const TitleTypography = styled(Typography)(
  ({ theme }) => `
      text-align: center;
      margin-bottom: 1.4rem; 
      `,
)

const SubTitleTypography = styled(Typography)(
  ({ theme }) => `
        text-align: center;
        margin: 0 auto 3.6rem; 
        max-width: 65.6rem;
        `,
)

const Team = () => {
  const navigate = useNavigate()

  return (
    <TeamContainer sx={{ margin: "14rem auto" }}>
      <WrapperBox>
        <TitleTypography variant="h2">Join Scroll and work with the best</TitleTypography>
        <SubTitleTypography variant="subtitle1">
          Scroll is a globally distributed team. We are united in our goal to improve Ethereum while maintaining decentralization and transparency.
          Join our team to work with experts in zero-knowledge cryptography and distributed systems on cutting edge technology.
        </SubTitleTypography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/join-us")}
          sx={{ display: "table", margin: "0 auto", marginBottom: "12rem" }}
        >
          View Open Positions
        </Button>
      </WrapperBox>
      <Avatars />

      <Photowall />

      <TitleTypography variant="h2">Sound like a good fit?</TitleTypography>
      <Button color="primary" variant="contained" onClick={() => navigate("/join-us")} sx={{ display: "table", margin: "0 auto" }}>
        View Open Positions
      </Button>
    </TeamContainer>
  )
}

export default Team
