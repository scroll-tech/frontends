import { Fragment } from "react"
import { makeStyles } from "tss-react/mui"

import { SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DecentralisationSvg } from "@/assets/svgs/refactor/story-decentralisation.svg"
import { ReactComponent as EthSvg } from "@/assets/svgs/refactor/story-eth.svg"
import { ReactComponent as ExternalSvg } from "@/assets/svgs/refactor/story-external.svg"
import { ReactComponent as SecuritySvg } from "@/assets/svgs/refactor/story-security.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const PERKS = [
  {
    icon: SecuritySvg,
    title: <>Medical, dental & vision</>,
    mobileTitle: "Medical, dental & vision",
    mobileScale: "0.88",
    content: "We offer competitive medical, dental, vision insurance for employees. This includes medical, dental, and vision premiums.",
  },
  {
    icon: EthSvg,
    title: <>Time-off</>,
    mobileTitle: "Time-off",
    mobileScale: "0.87",
    content: "We want you to take time off to rest and rejuvenate. Notion offers flexible paid vacation as well as 10+ observed holidays by country.",
  },
  {
    icon: ExternalSvg,
    title: <>Mental health & wellbeing</>,
    mobileTitle: "Mental health & wellbeing",
    mobileScale: "0.73",
    content: "You and your dependents will have access to providers that create personalized treatment plans, including therapy, coaching.",
  },
  {
    icon: DecentralisationSvg,
    title: <>Parental leave</>,
    mobileTitle: "Parental leave",
    mobileScale: "0.785",
    content: "We offer biological, adoptive, and foster parents paid time off to spend quality time with family.",
  },

  {
    icon: SecuritySvg,
    title: <>Fertility coverage</>,
    mobileTitle: "Fertility coverage",
    mobileScale: "0.88",
    content: "We offer competitive medical, dental, vision insurance for employees. This includes medical, dental, and vision premiums",
  },
  {
    icon: EthSvg,
    title: <>Retirement matching</>,
    mobileTitle: "Retirement matching",
    mobileScale: "0.87",
    content: "We want you to take time off to rest and rejuvenate. Notion offers flexible paid vacation as well as 10+ observed holidays by country.",
  },
  {
    icon: ExternalSvg,
    title: <>Commuter benefits</>,
    mobileTitle: "Commuter benefits",
    mobileScale: "0.73",
    content: "You and your dependents will have access to providers that create personalized treatment plans, including therapy, coaching.",
  },
  {
    icon: DecentralisationSvg,
    title: <>Monthly stipend</>,
    mobileTitle: "Monthly stipend",
    mobileScale: "0.785",
    content: "We offer biological, adoptive, and foster parents paid time off to spend quality time with family.",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "5rem",
    gridRowGap: "8rem",
    marginTop: "8rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gridRowGap: "5.6rem",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gap: "3.2rem",
      marginTop: "3.2rem",
    },
  },
}))

const Perks = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <SectionWrapper>
      <Typography variant="h1" sx={{ mb: ["3.2rem", "5.6rem"] }}>
        Perks and benefit
      </Typography>
      <SuccessionToView className={classes.grid}>
        {PERKS.map((item, index) => (
          <SuccessionItem>
            <SvgIcon
              sx={{ width: "auto", height: "auto", "@media (max-width: 600px)": { transform: `scale(${item.mobileScale})` } }}
              component={item.icon}
              inheritViewBox
            ></SvgIcon>
            <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1.3rem", "1.8rem", "2.2rem"], mb: ["0.8rem", "1.4rem", "2rem"] }}>
              {isMobile ? item.mobileTitle : item.title}
            </Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"] }}>{item.content}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Perks
