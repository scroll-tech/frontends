import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import Header from "./Header"
import Mission from "./Mission"
import News from "./News"
import Perks from "./Perks"
import Positions from "./Positions"
import WorkApproach from "./WorkApproach"

const useStyles = makeStyles()(theme => ({
  container: {
    marginTop: "-6.5rem",
    paddingTop: "6.5rem",
    overflow: "hidden",
  },
}))

const Career = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.container}>
      <Header />
      <Mission />
      <WorkApproach />
      <Perks />
      <News />
      <Positions />
    </Box>
  )
}

export default Career
