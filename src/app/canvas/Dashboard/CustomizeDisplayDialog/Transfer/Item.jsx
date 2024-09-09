import { forwardRef, useEffect } from "react"
import Img from "react-cool-img"
import { makeStyles } from "tss-react/mui"

import { Box } from "@mui/material"

import { ipfsToBrowserURL } from "@/utils"

const getTranslateX = transform => {
  return transform ? `${Math.round(transform.x)}px` : undefined
}

const getTranslateY = transform => {
  return transform ? `${Math.round(transform.y)}px` : undefined
}

const getScaleX = transform => {
  return transform?.scaleX ? `${transform.scaleX}` : undefined
}

const getScaleY = transform => {
  return transform?.scaleY ? `${transform.scaleY}` : undefined
}

const useStyles = makeStyles()((theme, { transform }) => ({
  "@keyframes pop": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1.05)",
    },
  },

  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  wrapper: {
    display: "flex",
    boxSizing: "border-box",
    transform: `translate3d(${getTranslateX(transform) || 0}, ${getTranslateY(transform) || 0}, 0) scaleX(${getScaleX(transform) || 1}) scaleY(${
      getScaleY(transform) || 1
    })`,
    transformOrigin: "0 0",
    touchAction: "manipulation",
    "&.dragOverlay": {
      zIndex: 999,
    },
  },
  fadeIn: {
    animation: "$fadeIn 500ms ease",
  },

  item: {
    position: "relative",
    width: "100%",
    transformOrigin: "50% 50%",
    transform: "scale(1)",
    transition: "box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)",
  },
  dragging: {
    opacity: 0.5,
    zIndex: 0,

    "&:not(.dragOverlay)": {
      opacity: 0.5,
      zIndex: 0,
    },
    "&.dragOverlay": {
      cursor: "inherit",
      animation: "$pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)",
      transform: "scale(1.05)",
      opacity: 1,
      position: "relative",
    },
  },
}))

const Item = forwardRef((props, ref) => {
  const { sx, className, fadeIn, dragging, transition, transform, listeners, name, image, dragOverlay } = props
  const { cx, classes } = useStyles({ transform })
  useEffect(() => {
    if (!dragOverlay) {
      return
    }

    document.body.style.cursor = "grabbing"

    return () => {
      document.body.style.cursor = ""
    }
  }, [dragOverlay])
  return (
    <Box
      ref={ref}
      sx={sx}
      className={cx(classes.wrapper, className, fadeIn && classes.fadeIn, dragOverlay && "dragOverlay")}
      style={{
        transition: [transition].filter(Boolean).join(", "),
      }}
    >
      <Box className={cx(classes.item, dragging && classes.dragging, dragOverlay && "dragOverlay")} {...listeners}>
        <Img alt={name} style={{ borderRadius: "0.8rem" }} src={ipfsToBrowserURL(image)} placeholder="/imgs/canvas/badgePlaceholder.svg" />
      </Box>
    </Box>
  )
})
Item.displayName = "Item"
export default Item
