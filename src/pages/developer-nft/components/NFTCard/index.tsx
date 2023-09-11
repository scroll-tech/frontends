import { makeStyles } from "tss-react/mui"

import { Card, CardContent, CardMedia } from "@mui/material"

const useStyles = makeStyles<any>()((theme, { size }) => ({
  card: {
    borderRadius: size === "large" ? "2rem" : "1.5rem",
  },
  cardImage: {
    width: size === "large" ? "32rem" : "25.8rem",
    aspectRatio: "1 / 1",
    margin: size === "large" ? "11.5px 11.5px 0" : "9.5px 9.px 0",
  },
  cardContent: {
    textAlign: "center",
    fontSize: size === "large" ? "1.85rem" : "1.5rem",
    lineHeight: "calc(1 + 2 / 3)",
    fontWeight: 600,
    paddingTop: size === "large" ? "1.5rem" : "1.2rem",
    paddingBottom: size === "large" ? "2.4rem !important" : "1.95rem !important",
  },
}))

const NFTCard = props => {
  const { size, name, image } = props
  const { classes } = useStyles({ size })

  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia classes={{ root: classes.cardImage }} image={image}></CardMedia>
      <CardContent classes={{ root: classes.cardContent }}>{name}</CardContent>
    </Card>
  )
}

export default NFTCard
