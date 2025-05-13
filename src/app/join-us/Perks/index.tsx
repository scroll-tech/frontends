"use client"

import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import IconSVG1 from "@/assets/svgs/career/perks/icon-1.svg"
import IconSVG2 from "@/assets/svgs/career/perks/icon-2.svg"
import IconSVG3 from "@/assets/svgs/career/perks/icon-3.svg"
import IconSVG4 from "@/assets/svgs/career/perks/icon-4.svg"
import IconSVG5 from "@/assets/svgs/career/perks/icon-5.svg"
import IconSVG6 from "@/assets/svgs/career/perks/icon-6.svg"
import IconSVG7 from "@/assets/svgs/career/perks/icon-7.svg"
import IconSVG8 from "@/assets/svgs/career/perks/icon-8.svg"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

// import { Fragment } from "react"

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
    icon: IconSVG3,
    title: "Paid time off",
    width: "3.1rem",
    // mobileScale: "0.73",
    content: "We offer discretionary paid time off and encourage people to take the time they need to rest and recharge when appropriate.",
  },
  {
    icon: IconSVG5,
    title: "Co-working allowance",
    width: "2.7rem",
    // mobileScale: "0.88",
    content: "Up to $200 USD per month for co-working membership for those who prefer to work away from home.",
  },
  {
    icon: IconSVG6,
    title: "Private healthcare",
    width: "3.1rem",
    // mobileScale: "0.87",
    content: "Offered in selected countries, including the US, Canada and the UK.",
  },
  {
    icon: IconSVG8,
    title: "Team meetups",
    width: "3.3rem",
    // mobileScale: "0.785",
    content: "We encourage small teams to meet and work together in person once in awhile.",
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
  // <IconSvg className={`w-[width] h-[3.4rem]`}></IconSvg>

  return (
    <SectionWrapper>
      <Typography sx={{ fontSize: ["3.2rem", "4.8rem"], mb: ["3.2rem", "5.6rem"] }}>Perks and benefit</Typography>
      <SuccessionToView className={classes.grid}>
        {PERKS.map(({ icon: IconSvg, width, title, content }, index) => (
          <SuccessionItem key={index}>
            <IconSvg className={`w-[${width}] h-[3.4rem]`}></IconSvg>
            <Typography
              sx={{
                fontSize: ["2rem", "2.4rem"],
                fontWeight: 600,
                mt: ["1.3rem", "1.8rem", "2.2rem"],
                mb: ["0.8rem", "1.4rem", "2rem"],
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: ["1.6rem", "2rem"] }}>{content}</Typography>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Perks
