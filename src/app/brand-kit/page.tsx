"use client"

import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import Assets from "./Assets"
import Header from "./Header"

const useStyles = makeStyles()(() => ({
  container: {
    marginTop: "-6.5rem",
    paddingTop: "6.5rem",
    overflow: "hidden",
    backgroundColor: "#FFEEDA",
  },
}))

const Ecosystem = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Header />
      <Assets />
    </Box>
  )
}

export default Ecosystem
