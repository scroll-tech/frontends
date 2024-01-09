// import { Fragment } from "react"
import { makeStyles } from "tss-react/mui"

import { SvgIcon, Typography } from "@mui/material"

import { ReactComponent as IconSVG1 } from "@/assets/svgs/career/perks/icon-1.svg"
import { ReactComponent as IconSVG2 } from "@/assets/svgs/career/perks/icon-2.svg"
import { ReactComponent as IconSVG3 } from "@/assets/svgs/career/perks/icon-3.svg"
import { ReactComponent as IconSVG4 } from "@/assets/svgs/career/perks/icon-4.svg"
import { ReactComponent as IconSVG5 } from "@/assets/svgs/career/perks/icon-5.svg"
import { ReactComponent as IconSVG6 } from "@/assets/svgs/career/perks/icon-6.svg"
import { ReactComponent as IconSVG7 } from "@/assets/svgs/career/perks/icon-7.svg"
import { ReactComponent as IconSVG8 } from "@/assets/svgs/career/perks/icon-8.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"

// import useCheckViewport from "@/hooks/useCheckViewport"

const PERKS = [
  {
    icon: IconSVG1,
    title: "Fully remote working",
    width: "2.7rem",
    // mobileScale: "0.88",
    content: "We have always been a fully remote team and Scrollers have the flexibility to choose where and when they work.",
  },
  {
    icon: IconSVG2,
    title: "Home office set up",
    width: "2.2rem",
    // mobileScale: "0.87",
    content: "A choice of equipment is provided through our onboarding partner Hofy, along with furniture needed to create a comfortable work space.",
  },
  {
    icon: IconSVG3,
    title: "Paid time off",
    width: "3.1rem",
    // mobileScale: "0.73",
    content: "A total of 25 days PTO per year, plus local public holidays, and we encourage everyone to use it.",
  },
  {
    icon: IconSVG4,
    title: "Growth budget",
    width: "3rem",
    // mobileScale: "0.785",
    content: "Up to $3,000 USD per year to pursue learning and growth opportunities.",
  },

  {
    icon: IconSVG5,
    title: "Co-working allowance",
    width: "2.7rem",
    // mobileScale: "0.88",
    content: "Up to $300 USD per month for co-working membership for those who prefer to work away from home.",
  },
  {
    icon: IconSVG6,
    title: "Private healthcare",
    width: "3.1rem",
    // mobileScale: "0.87",
    content: "Offered in selected countries, including the US, Canada and the UK.",
  },
  {
    icon: IconSVG7,
    title: "Global offsites",
    width: "4.3rem",
    // mobileScale: "0.73",
    content: "We get together in a cool location at least once a year to get to know each other in person, work together, and have fun.",
  },
  {
    icon: IconSVG8,
    title: "Team meetups",
    width: "3.3rem",
    // mobileScale: "0.785",
    content: "We encourage teams to meet and work together in person at least once a year.",
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
      gridTemplateColumns: "repeat(1, 1fr 1fr)",
      gridRowGap: "5.6rem",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      display: "flex",
      flexDirection: "column",
      gap: "3.2rem",
      marginTop: "3.2rem",
    },
  },
}))

const Perks = () => {
  const { classes } = useStyles()
  // const { isMobile } = useCheckViewport()

  return (
    <SectionWrapper>
      <Typography sx={{ fontSize: ["3.2rem", "4.8rem"], mb: ["3.2rem", "5.6rem"] }}>Perks & benefits</Typography>
      <SuccessionToView className={classes.grid}>
        {PERKS.map((item, index) => (
          <SuccessionItem key={index}>
            <SvgIcon sx={{ width: item.width, height: "3.4rem" }} component={item.icon} inheritViewBox></SvgIcon>
            <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1.3rem", "1.8rem", "2.2rem"], mb: ["0.8rem", "1.4rem", "2rem"] }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"] }}>{item.content}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Perks
