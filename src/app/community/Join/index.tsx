import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { COMMUNITY_EXPLORER_LIST } from "@/constants/community"

import Card from "./Card"
import CardLarge from "./CardLarge"

const useStyles = makeStyles()(theme => ({
  flex: {
    marginTop: "4.8rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "3rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "100%",
      gridGap: "2rem",
      marginTop: "2rem",
    },
  },
  large: {
    gridColumn: "span 3",
    [theme.breakpoints.down("md")]: {
      gridColumn: "span 1",
    },
  },
  flexItem: {
    flex: 1,
    alignSelf: "stretch",
  },
}))

const Join = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper sx={{ pb: ["4rem", "4rem", "12.6rem"], pt: [0] }}>
      <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["4rem", "5.6rem"], fontWeight: 500 }}>Join our community</Typography>
      <SuccessionToView className={classes.flex}>
        <SuccessionItem className={classes.large}>
          <CardLarge></CardLarge>
        </SuccessionItem>
        {COMMUNITY_EXPLORER_LIST.map(item => (
          <SuccessionItem key={item.title} className={classes.flexItem}>
            <Card {...item}></Card>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Join
