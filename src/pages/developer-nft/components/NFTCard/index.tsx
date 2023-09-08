import { makeStyles } from "tss-react/mui"

import { Card, CardContent, CardMedia } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  card: {
    width: "27.7rem",
    borderRadius: "1.5rem",
  },
  cardImage: {
    width: "25.8rem",
    height: "25.8rem",
    margin: "9.5px auto 0",
  },
  cardContent: {
    textAlign: "center",
    fontSize: "1.5rem",
    lineHeight: "2.5rem",
    fontWeight: 600,
    paddingTop: "1.2rem",
    paddingBottom: "1.95rem !important",
  },
}))

const NFTCard = props => {
  const { name, image } = props
  const { classes } = useStyles()

  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia classes={{ root: classes.cardImage }} image={image}></CardMedia>
      <CardContent classes={{ root: classes.cardContent }}>{name}</CardContent>
    </Card>
  )
}

export default NFTCard
