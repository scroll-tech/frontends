import { useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

import ImageViewer from "@/app/sticker-vote/components/ImageViewer"
import StickerPicture from "@/app/sticker-vote/components/StickerPicture"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import useCheckViewport from "@/hooks/useCheckViewport"

const useStyles = makeStyles()(theme => ({
  flex: {
    display: "flex",
    gap: "7.2rem",
    padding: "0 10rem",
    "& > *": {
      flex: 1,
    },
    [theme.breakpoints.down("lg")]: {
      padding: "0 6rem",
      gap: "4.8rem",
    },

    [theme.breakpoints.down("md")]: {
      padding: 0,
      gap: "2rem",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: "1.6rem",
    },
  },
}))

const Winner = props => {
  const {
    data: { name, author, images, bg },
  } = props
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()
  const [image, setImage] = useState<{ src?: string; alt?: string; style?: object }>({})

  const handleViewImage = value => {
    setImage(value)
  }
  const handleClose = () => {
    setImage({})
  }

  return (
    <>
      <Stack direction="column" alignItems="center">
        <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4rem"], fontWeight: 600, mb: "1.6rem", textAlign: "center" }}>
          {name} - {author}
        </Typography>
        <SuccessionToView className={classes.flex} threshold={isMobile ? 0 : 0.1}>
          {images.map((src, index) => (
            <SuccessionItem key={index}>
              <StickerPicture
                src={src}
                alt={`${name}-${author}-${index}`}
                bgColor={Array.isArray(bg) ? bg[index] : bg}
                onClick={handleViewImage}
              ></StickerPicture>
            </SuccessionItem>
          ))}
        </SuccessionToView>
      </Stack>
      <ImageViewer src={image.src} alt={image.alt} imageStyle={image.style} open={!!image.src} onClose={handleClose}></ImageViewer>
    </>
  )
}

export default Winner
