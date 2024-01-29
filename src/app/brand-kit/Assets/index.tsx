import { makeStyles } from "tss-react/mui"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import { brandAssets } from "@/constants"

import AssetCard from "./AssetCard"

const useStyles = makeStyles()(theme => ({
  float: {
    width: "calc(50% - 1.5rem)",
    float: "right",
    "&:nth-of-type(2n)": {
      float: "left",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      float: "none",
    },
  },
}))

const Assets = props => {
  const { classes } = useStyles()
  return (
    <SectionWrapper transparent sx={{ pt: ["0"] }}>
      {brandAssets.map((item, index) => (
        <SuccessionToView key={index} threshold={0.1} className={item.type === "onlyOneImage" ? classes.float : ""}>
          <SuccessionItem>
            <AssetCard data={item}></AssetCard>
          </SuccessionItem>
        </SuccessionToView>
      ))}
    </SectionWrapper>
  )
}

export default Assets
