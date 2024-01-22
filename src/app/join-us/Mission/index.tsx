import { Typography } from "@mui/material"
import { styled } from "@mui/system"

import OrientationToView from "@/components/Motion/OrientationToView"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"

const Container = styled(SectionWrapper)(({ theme }) => ({
  paddingBottom: "16rem",
  [theme.breakpoints.down("md")]: {
    paddingBottom: "12rem",
  },
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "3.2rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  maxWidth: "115.5rem",
  textAlign: "center",
  color: theme.palette.text.primary,
  margin: "0 auto ",
  fontSize: "3.2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "6.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    marginBottom: "3.2rem",
  },
}))

const Missions = styled(SuccessionToView)(({ theme }) => ({
  display: "none",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "0",
  },
}))

const MissionItem = styled(SuccessionItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  maxWidth: "56.3rem",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}))

const MissionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  marginBottom: "3.2rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "2.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "0.8rem",
  },
}))

const MissionDescription = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  color: theme.palette.text.primary,
  marginBottom: "2rem",
  fontSize: "2.4rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    marginBottom: "3.2rem",
  },
}))

const MISSION = [
  {
    title: "Our culture",
    description:
      "The Scroll team is a tight-knit group of cryptography researchers, engineers, experts, and community champions. We're a global, remote team that values autonomy and high performance through kindness, direct communication, and empathy.",
  },
  {
    title: "Our value",
    description:
      "At Scroll, we have a shared mission to uphold neutrality, openness, and be community-first as we strive to preserve Ethereum's core properties and prioritize the collective well-being of our ecosystem.",
  },
]

const Mission = () => {
  return (
    <Container>
      <OrientationToView>
        <Title>
          Scroll’s mission is to provide an accessible scaling solution that preserves the essence of Ethereum - trust-minimized, secure and
          open-source.
        </Title>
      </OrientationToView>

      <Missions>
        {MISSION.map((mission, index) => (
          <MissionItem key={index}>
            <MissionTitle variant="h1">{mission.title}</MissionTitle>
            <MissionDescription>{mission.description}</MissionDescription>
          </MissionItem>
        ))}
      </Missions>
    </Container>
  )
}

export default Mission
