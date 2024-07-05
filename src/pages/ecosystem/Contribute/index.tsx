import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ContributeCard from "./ContributeCard"

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
  flexItem: {
    flex: 1,
    alignSelf: "stretch",
  },
}))

const Contribute = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper sx={{ pb: ["4rem", "4rem", "12.6rem"], pt: ["4rem", "4rem", "9rem"] }}>
      <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["4rem", "5.6rem"], fontWeight: 500 }}>Contribute to the ecosystem</Typography>
      <SuccessionToView className={classes.flex}>
        {ECOSYSTEM_EXPLORER_LIST.map(item => (
          <SuccessionItem key={item.title} className={classes.flexItem}>
            <ContributeCard {...item}></ContributeCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Contribute
