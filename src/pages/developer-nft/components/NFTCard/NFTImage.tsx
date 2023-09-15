import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  img: {
    width: "auto",
    height: "100%",
  },
}))

const NFTCard = props => {
  const { sx, src } = props
  const { classes } = useStyles()

  return (
    <Box sx={sx}>
      <img src={src} className={classes.img} alt="NFT-img"></img>
    </Box>
  )
}

export default NFTCard
