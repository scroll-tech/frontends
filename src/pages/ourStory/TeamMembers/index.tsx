import { makeStyles } from "tss-react/mui"

import { Avatar, Typography } from "@mui/material"

import BackupAvatar from "@/assets/svgs/refactor/backup-avatar.svg"
import HaichenAvatar from "@/assets/svgs/refactor/haichen-avatar.svg"
import SandyAvatar from "@/assets/svgs/refactor/sandy-avatar.svg"
import YeAvatar from "@/assets/svgs/refactor/ye-avatar.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"

const CORE_MEMBERS = [
  {
    avatar: SandyAvatar,
    name: "Sandy",
    desc: "founder in Hong Kong",
  },
  {
    avatar: YeAvatar,
    name: "Ye",
    desc: "founder in Beijing",
  },
  {
    avatar: HaichenAvatar,
    name: "Haichen",
    desc: "founder in San Francisco",
  },
  {
    avatar: BackupAvatar,
    name: "Jane",
    desc: "head of operations in London",
  },
  {
    avatar: BackupAvatar,
    name: "Toghrul",
    desc: "senior researcher in Dubai",
  },
  {
    avatar: BackupAvatar,
    name: "Dan",
    desc: "devrel lead in Oklahoma, US",
  },
  {
    avatar: BackupAvatar,
    name: "Lea",
    desc: "partnerships lead in Berlin",
  },
  {
    avatar: BackupAvatar,
    name: "Mohammad",
    desc: "protocol researcher - Vancouver, Canada",
  },
  {
    avatar: BackupAvatar,
    name: "Mei",
    desc: "comms & outreach lead in Texas, US",
  },
  {
    avatar: BackupAvatar,
    name: "Peter",
    desc: "infrastructure engineer in Budapest, Hungary",
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
        content="The Scroll team is a tight-knit group of cryptography researchers, engineers, experts, and community champions. We're a global remote team that values autonomy and high performance through kindness, direct communication, and empathy."
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
