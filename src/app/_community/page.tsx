"use client"

import dynamic from "next/dynamic"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import Events from "./Events"
import Join from "./Join"

const Globe = dynamic(() => import("./Globe"), { ssr: false })

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
