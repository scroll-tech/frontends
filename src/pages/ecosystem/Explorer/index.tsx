import { makeStyles } from "tss-react/mui"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ExplorerCard from "./ExplorerCard"

const useStyles = makeStyles()(theme => ({
  flex: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "3rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
      gridGap: "2rem",
    },
  },
  flexItem: {
    flex: 1,
    alignSelf: "stretch",
  },
}))

const Explorer = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper full sx={{ pb: ["12rem", "16rem"], pt: ["11.8rem", "16.3rem"] }}>
      <SuccessionToView className={classes.flex}>
        {ECOSYSTEM_EXPLORER_LIST.map(item => (
          <SuccessionItem key={item.title} className={classes.flexItem}>
            <ExplorerCard {...item}></ExplorerCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Explorer
