import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"
import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import useCheckViewport from "@/hooks/useCheckViewport"

import StickerPicture from "./StickerPicture"
import data from "./data.json"

const useStyles = makeStyles()(theme => ({
  gird: {
    paddingTop: "4.8rem",
    paddingBottom: "7.2rem",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "4.8rem",
    gridRowGap: "7.2rem",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridRowGap: "3.2rem",
      paddingTop: "3.6rem",
      paddingBottom: "3.2rem",
    },
  },
}))

const Gallery = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()
  return (
    <SuccessionToView className={classes.gird}>
      {data.map(({ name, author, images, bg }) => (
        <SuccessionItem key={name}>
          <Box>
            <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4rem"], fontWeight: 600, mb: "1.6rem", textAlign: "center" }}>
              {name} - {author}
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} gap={isMobile ? "1.6rem" : "2rem"}>
              {images.map((src, index) => (
                <StickerPicture src={src} alt={`${name}-${author}-${index}`} bgColor={Array.isArray(bg) ? bg[index] : bg}></StickerPicture>
              ))}
            </Stack>
          </Box>
        </SuccessionItem>
      ))}
    </SuccessionToView>
  )
}

export default Gallery
