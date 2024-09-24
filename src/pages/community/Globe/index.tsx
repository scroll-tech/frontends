import React, { Suspense, lazy } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Typography } from "@mui/material"

const GlobeComponent = lazy(() => import("./GlobeComponent"))

const useStyles = makeStyles()(theme => ({
  title: {
    color: "#101010",
    textAlign: "center",
    fontSize: "4.8rem",
    fontWeight: 600,
    lineHeight: "8.4rem",
    marginTop: "7.2rem",
    marginBottom: "4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "4rem",
      lineHeight: "5rem",
      marginTop: "6rem",
      marginBottom: "3rem",
      padding: "0 1.6rem",
    },
  },
}))

function Earth() {
  const { classes } = useStyles()

  return (
    <Box>
      <Typography className={classes.title}>Scroll Around the World</Typography>
      <Suspense fallback={<div style={{ height: "70rem" }}></div>}>
        <GlobeComponent />
      </Suspense>
    </Box>
  )
}

export default Earth
