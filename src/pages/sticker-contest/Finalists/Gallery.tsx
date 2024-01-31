import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"
import { Typography } from "@mui/material"
import { Stack } from "@mui/system"

import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import useCheckViewport from "@/hooks/useCheckViewport"

import StickerPicture from "./StickerPicture"

const useStyles = makeStyles()(theme => ({
  gird: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "4.8rem",
    gridRowGap: "7.2rem",
    width: "100%",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridColumnGap: "3.6rem",
      gridRowGap: "4.8rem",
    },

    [theme.breakpoints.down("sm")]: {
      gridRowGap: "3.2rem",
    },
  },
}))

const Gallery = props => {
  const { data, className } = props
  const { classes, cx } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <SuccessionToView className={cx(classes.gird, className)} threshold={isMobile ? 0 : 0.1}>
      {data.map(({ name, author, images, bg }) => (
        <SuccessionItem key={name}>
          <Box>
            <Typography sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4rem"], fontWeight: 600, mb: "1.6rem", textAlign: "center" }}>
              {name} - {author}
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} gap={isMobile ? "1.6rem" : "2rem"}>
              {images.map((src, index) => (
                <StickerPicture
                  key={index}
                  src={src}
                  alt={`${name}-${author}-${index}`}
                  bgColor={Array.isArray(bg) ? bg[index] : bg}
                ></StickerPicture>
              ))}
            </Stack>
          </Box>
        </SuccessionItem>
      ))}
    </SuccessionToView>
  )
}

export default Gallery
