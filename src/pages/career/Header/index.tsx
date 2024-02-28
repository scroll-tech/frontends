import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  container: {
    marginTop: "-6.5rem",
    paddingTop: "6.5rem",
    background: theme.palette.themeBackground.normal,
    "& > .MuiBox-root": {
      background: theme.palette.themeBackground.normal,
    },
  },
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, min-content)",
    rowGap: "2.5rem",
    columnGap: "4rem",
    paddingBottom: "5.4rem",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr",
      gap: "2rem",
      paddingTop: "7.3rem",
      paddingBottom: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "7.3rem",
      paddingBottom: "4rem",
      justifyItems: "center",
    },
  },
  titleWrapper: {
    gridRow: "span 2",
  },
  subTitleWrapper: {
    width: "68rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "68rem",
    },
  },
  actionGroup: {
    marginTop: "3rem",
    [theme.breakpoints.between("sm", "lg")]: {},
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()
  return (
    <Box className={classes.container}>
      <SectionWrapper className={classes.root}>
        <OrientationToView className={classes.titleWrapper}>
          <Typography
            sx={{
              fontSize: ["4rem", "7.8rem"],
              lineHeight: ["5rem", "8.5rem"],
              fontWeight: 600,
              textAlign: ["center", "left"],
              width: "max-content",
            }}
          >
            Join us
          </Typography>
        </OrientationToView>

        <OrientationToView className={classes.subTitleWrapper}>
          <Typography
            sx={{
              fontSize: ["2rem", "2.6rem"],
              textAlign: ["center", "left"],
            }}
          >
            Join our team of diverse and talented researchers, engineers, experts and community champions who are passionate about creating the best
            L2 Ethereum ecosystem.
          </Typography>
        </OrientationToView>
        <OrientationToView delay={0.3} className={classes.actionGroup}>
          <Button href="https://boards.greenhouse.io/scrollio" target="_blank" color="primary" width={isMobile ? "21rem" : "25rem"}>
            View open positions
          </Button>
        </OrientationToView>
        <Box
          sx={{
            borderRadius: "4rem 4rem 0 0",
            height: ["20rem", "37.9rem"],
            marginTop: "2rem",
            gridColumn: "1 / -1",
            width: "100%",
            background: ["url(/imgs/career/career-bg.svg) center / contain no-repeat", "url(/imgs/career/career-bg.svg) right / contain no-repeat"],
            backgroundSize: "cover",
          }}
        ></Box>
      </SectionWrapper>
    </Box>
  )
}

export default Header
