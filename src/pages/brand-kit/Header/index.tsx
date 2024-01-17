import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import { BRAND_ASSETS_LINK, FIGMA_LINK } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "12rem",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      paddingBottom: "4rem",
    },
  },
  titleWrapper: {
    gridRow: "span 2",
  },
  subTitleWrapper: {
    width: "68rem",
  },
  actionGroup: {
    display: "flex",
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const { isPortrait, isMobile } = useCheckViewport()
  return (
    <SectionWrapper transparent className={classes.root}>
      <OrientationToView className={classes.titleWrapper}>
        <Typography
          sx={{
            fontSize: ["4rem", "7.8rem"],
            lineHeight: ["5rem", "8.5rem"],
            fontWeight: 600,
            textAlign: ["left"],
            marginBottom: ["2.4rem", "2.4rem", "0"],
          }}
        >
          Brand Kit
        </Typography>
      </OrientationToView>
      <OrientationToView delay={0.3} className={classes.actionGroup}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: isPortrait ? "2rem" : "3rem" }}>
          <Button href={BRAND_ASSETS_LINK} download color="primary" width={isMobile ? "18.5rem" : "20.7rem"}>
            Download All
          </Button>
          <Button href={FIGMA_LINK} target="_blank" width={isMobile ? "18.5rem" : "20.7rem"}>
            Go to Figma
          </Button>
        </Box>
      </OrientationToView>
    </SectionWrapper>
  )
}

export default Header
