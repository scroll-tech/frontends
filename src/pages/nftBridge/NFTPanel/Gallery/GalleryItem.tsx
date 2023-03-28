import { Card, CardContent, CardMedia, Typography } from "@mui/material"

const GalleryItem = props => {
  const { id, image, name } = props

  return (
    <Card sx={{ width: "17.5rem" }}>
      <CardMedia sx={{ aspectRatio: "1" }} image={image} title={id} />
      <CardContent
        sx={{
          p: "0.5rem 0.6rem 0.9rem",
          "&:last-child": {
            pb: "0.9rem",
          },
        }}
      >
        <Typography>{`#${id}` || name}</Typography>
      </CardContent>
    </Card>
  )
}

export default GalleryItem
