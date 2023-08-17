import { makeStyles } from "tss-react/mui"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { ECOSYSTEM_EXPLORER_LIST } from "@/constants"

import ExplorerCard from "./ExplorerCard"

const useStyles = makeStyles()(theme => ({
  flex: {
    display: "flex",
    gap: "3rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "2rem",
    },
  },
}))

const Explorer = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper full sx={{ pb: ["12rem", "16rem"], pt: ["11.8rem", "16.3rem"] }}>
      <SuccessionToView className={classes.flex}>
        {ECOSYSTEM_EXPLORER_LIST.map(item => (
          <SuccessionItem key={item.title}>
            <ExplorerCard {...item}></ExplorerCard>
          </SuccessionItem>
        ))}
      </SuccessionToView>
    </SectionWrapper>
  )
}

export default Explorer
