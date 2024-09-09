"use client"

import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import Events from "./Events"
import Globe from "./Globe"
import Join from "./Join"

const useStyles = makeStyles()(() => ({
  container: {
    marginTop: "-6.5rem",
    paddingTop: "6.5rem",
    overflow: "hidden",
  },
}))

const Community = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container} id="community-container">
      <Globe />
      <Events />
      <Join />
    </Box>
  )
}

export default Community
