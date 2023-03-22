import { Card, CardContent, CardMedia, Typography } from "@mui/material"

const GalleryItem = props => {
  const { id, image, name } = props

  return (
    <Card sx={{ width: "30rem" }}>
      <CardMedia sx={{ aspectRatio: "1" }} image={image} title={id} />
      <CardContent>
        <Typography>{name || `#${id}`}</Typography>
      </CardContent>
    </Card>
  )
}

export default GalleryItem
