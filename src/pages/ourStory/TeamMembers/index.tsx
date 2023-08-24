import { makeStyles } from "tss-react/mui"

import { Avatar, Typography } from "@mui/material"

import DanielAvatar from "@/assets/svgs/members/Dan-avatar.svg"
import HaichenAvatar from "@/assets/svgs/members/Haichen-avatar.svg"
import JaneAvatar from "@/assets/svgs/members/Jane-avatar.svg"
import LeaAvatar from "@/assets/svgs/members/Lea-avatar.svg"
import MeiAvatar from "@/assets/svgs/members/Mei-avatar.svg"
import MohammadAvatar from "@/assets/svgs/members/Mohammad-avatar.svg"
import PeterAvatar from "@/assets/svgs/members/Peter-avatar.svg"
import SandyAvatar from "@/assets/svgs/members/Sandy-avatar.svg"
import ToghrulAvatar from "@/assets/svgs/members/Toghrul-avatar.svg"
import YeAvatar from "@/assets/svgs/members/Ye-avatar.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const CORE_MEMBERS = [
  {
    avatar: YeAvatar,
    name: "Ye",
    desc: "Co-founder in London, UK",
  },
  {
    avatar: SandyAvatar,
    name: "Sandy",
    desc: "Co-founder in Hong Kong",
  },

  {
    avatar: HaichenAvatar,
    name: "Haichen",
    desc: "Co-founder in San Francisco",
  },
  {
    avatar: MeiAvatar,
    name: "Mei",
    desc: "Comms & outreach lead in Texas, US",
  },
  {
    avatar: DanielAvatar,
    name: "Daniel",
    desc: "Devrel lead in Oklahoma, US",
  },
  {
    avatar: JaneAvatar,
    name: "Jane",
    desc: "Head of operations in London",
  },
  {
    avatar: MohammadAvatar,
    name: "Mohammad",
    desc: "Protocol researcher - Vancouver, Canada",
  },
  {
    avatar: LeaAvatar,
    name: "Lea",
    desc: "Partnerships lead in Berlin",
  },
  {
    avatar: ToghrulAvatar,
    name: "Toghrul",
    desc: "Senior researcher in Dubai",
  },
  {
    avatar: PeterAvatar,
    name: "Peter",
    desc: "Infrastructure engineer in Budapest, Hungary",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 16.3rem)",
    gridColumnGap: "8.9rem",
    gridRowGap: "6rem",
    margin: "13rem auto 0",
    width: "min-content",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridColumnGap: "4.6rem",
      gridRowGap: "5rem",
    },
  },
  img: {
    position: "relative",
    top: "8px",
    height: "auto",
  },
}))

const TeamMembers = () => {
  const { classes } = useStyles()

  return (
    <SectionWrapper sx={{ pt: ["11rem", "26rem"] }}>
      <SectionHeader
        title="Our team"
        content="The Scroll team is a tight-knit group of cryptography researchers, engineers, experts, and community champions. We're a global, remote team that values autonomy and high performance through kindness, direct communication, and empathy."
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {CORE_MEMBERS.map(item => (
          <SuccessionItem key={item.name}>
            <Avatar
              sx={{ backgroundColor: "themeBackground.highlight", width: ["11.6rem", "16.3rem"], height: ["11.6rem", "16.3rem"] }}
              src={item.avatar}
              classes={{ img: classes.img }}
            ></Avatar>
            <Typography sx={{ fontSize: "2rem", fontWeight: 600, mt: "2.2rem", mb: "0.6rem", textAlign: "center" }}>{item.name}</Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"], textAlign: "center" }}>{item.desc}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default TeamMembers
