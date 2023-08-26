import { makeStyles } from "tss-react/mui"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import { LIST_YOUR_DAPP_LINK } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "min-content min-content",
    rowGap: "2.5rem",
    columnGap: "4rem",
    paddingBottom: "15.4rem",
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {
      gridTemplateColumns: "min-content 1fr",
    },
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "1fr",
      gap: "2rem",
      paddingTop: "7.3rem",
      paddingBottom: "4rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "7.3rem",
      paddingBottom: "4rem",
    },
  },
  titleWrapper: {
    gridRow: "span 2",
  },
  subTitleWrapper: {
    width: "68rem",
    [theme.breakpoints.down("xl")]: {
      width: "100%",
      maxWidth: "68rem",
    },
  },
  actionGroup: {
    display: "flex",
    [theme.breakpoints.between("sm", "lg")]: {
      justifyContent: "flex-end",
      marginTop: "4rem",
    },
  },
}))

const Header = () => {
  const { classes } = useStyles()
  const { isPortrait, isMobile } = useCheckViewport()
  return (
    <>
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
            An Ecosystem <br></br> Forever in Motion
          </Typography>
        </OrientationToView>

        <OrientationToView className={classes.subTitleWrapper}>
          <Typography
            sx={{
              fontSize: ["2rem", "2.6rem"],
              textAlign: ["center", "left"],
            }}
          >
            Join a supportive, collaborative ecosystem with a greater purpose – permissionless, flexible, and dedicated to defining the future of
            Ethereum.
          </Typography>
        </OrientationToView>
        <OrientationToView delay={0.3} className={classes.actionGroup}>
          <Stack direction={isMobile ? "column" : "row"} spacing={isPortrait ? "2rem" : "3rem"} alignItems="center">
            <Button href="/bridge" color="primary" width={isMobile ? "18.4rem" : "25rem"}>
              Bridge into Scroll
            </Button>
            <Button href={LIST_YOUR_DAPP_LINK} target="_blank" width={isMobile ? "18.4rem" : "25rem"}>
              List your dApp
            </Button>
          </Stack>
        </OrientationToView>
      </SectionWrapper>
      <Box sx={{ backgroundColor: theme => theme.palette.themeBackground.light }}>
        <Box
          sx={{
            borderRadius: "4rem 4rem 0 0",
            height: ["50.8rem", "37rem", "24vw"],
            background: [
              "url(/imgs/ecosystem/ecosystem-bg-mobile.svg) center / cover no-repeat",
              "url(/imgs/ecosystem/ecosystem-bg.svg) center / cover no-repeat",
            ],
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
    </>
  )
}

export default Header
