import { makeStyles } from "tss-react/mui"

import { Avatar, Typography } from "@mui/material"

import DanielAvatar from "@/assets/svgs/members/Dan-avatar.svg"
import HaichenAvatar from "@/assets/svgs/members/Haichen-avatar.svg"
import JaneAvatar from "@/assets/svgs/members/Jane-avatar.svg"
import LeaAvatar from "@/assets/svgs/members/Lea-avatar.svg"
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
    desc: "Co-Founder in London",
  },
  {
    avatar: SandyAvatar,
    name: "Sandy",
    desc: "Co-Founder in Hong Kong",
  },

  {
    avatar: HaichenAvatar,
    name: "Haichen",
    desc: "Co-Founder in San Francisco",
  },
  {
    avatar: JaneAvatar,
    name: "Jane",
    desc: "Head of Operations in London",
  },
  {
    avatar: DanielAvatar,
    name: "Daniel",
    desc: "Devrel Lead in Oklahoma City",
  },
  {
    avatar: MohammadAvatar,
    name: "Mohammad",
    desc: "Protocol Researcher in Vancouver",
  },
  {
    avatar: LeaAvatar,
    name: "Lea",
    desc: "Partnerships Lead in Berlin",
  },
  {
    avatar: ToghrulAvatar,
    name: "Toghrul",
    desc: "Senior Researcher in Dubai",
  },
  {
    avatar: PeterAvatar,
    name: "Peter",
    desc: "Infrastructure Engineer in Budapest",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(16.3rem, 1fr))",
    gridColumnGap: "8.9rem",
    gridRowGap: "6rem",
    margin: "13rem auto 0",
    width: "100%",
    maxWidth: "117.1rem",
    [theme.breakpoints.down("sm")]: {
      width: "min-content",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridColumnGap: "4.6rem",
      gridRowGap: "5rem",
      margin: "8rem auto 0",
    },
  },
  gridItem: {
    width: "16.3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
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
    <SectionWrapper sx={{ pt: ["11rem", "18rem", "26rem"] }}>
      <SectionHeader
        title="Our team"
        content="The Scroll team is a tight-knit group of cryptography researchers, engineers, experts, and community champions. We're a global, remote team that values autonomy and high performance through kindness, direct communication, and empathy."
      ></SectionHeader>
      <SuccessionToView className={classes.grid}>
        {CORE_MEMBERS.map(item => (
          <SuccessionItem key={item.name} className={classes.gridItem}>
            <Avatar
              sx={{ backgroundColor: "themeBackground.highlight", width: ["11.6rem", "16.3rem"], height: ["11.6rem", "16.3rem"] }}
              src={item.avatar}
              classes={{ img: classes.img }}
            ></Avatar>
            <Typography sx={{ fontSize: "2rem", fontWeight: 600, mt: ["1.2rem", "2.2rem"], mb: [0, "0.6rem"], textAlign: "center" }}>
              {item.name}
            </Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"], textAlign: "center" }}>{item.desc}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default TeamMembers
