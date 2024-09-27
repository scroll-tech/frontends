import { getAbsoluteZoom, getZoomFactor } from "advanced-cropper/extensions/absolute-zoom"
import { forwardRef } from "react"
import { CropperFade, FixedCropper, FixedCropperProps, FixedCropperRef, ImageRestriction } from "react-advanced-cropper"

import { IconButton, Slider, Stack, SvgIcon } from "@mui/material"

import { ReactComponent as ZoomInSvg } from "@/assets/svgs/canvas/zoom-in.svg"
import { ReactComponent as ZoomOutSvg } from "@/assets/svgs/canvas/zoom-out.svg"

import "./cropper.css"

const AvatarCropper = forwardRef<FixedCropperRef, FixedCropperProps>((props: FixedCropperProps, ref) => {
  const { stencilProps, ...restProps } = props
  return (
    <FixedCropper
      ref={ref}
      stencilProps={{
        handlers: false,
        lines: false,
        movable: false,
        resizable: false,
        ...stencilProps,
      }}
      imageRestriction={ImageRestriction.stencil}
      wrapperComponent={CustomWrapper}
      style={{ height: "32rem" }}
      {...restProps}
    />
  )
})

const CustomWrapper = props => {
  const { cropper, children, loaded } = props
  const state = cropper.getState()

  const settings = cropper.getSettings()

  const absoluteZoom = getAbsoluteZoom(state, settings)

  const onZoom = (value: number, transitions?: boolean) => {
    cropper.zoomImage(getZoomFactor(state, settings, value), {
      transitions: !!transitions,
    })
  }

  return (
    <CropperFade style={{ display: "flex", flexDirection: "column", alignItems: "center" }} visible={state && loaded}>
      {children}
      <Navigation zoom={absoluteZoom} onZoom={onZoom} />
    </CropperFade>
  )
}

const Navigation = props => {
  const { onZoom, zoom } = props

  const handleZoomIn = () => {
    if (onZoom) {
      onZoom(Math.min(1, zoom + 0.25), true)
    }
  }

  const handleZoomOut = () => {
    if (onZoom) {
      onZoom(Math.max(0, zoom - 0.25), true)
    }
  }

  return (
    <Stack direction="row" alignItems="center" gap="1.6rem" sx={{ width: "32rem", mt: "3.6rem" }}>
      <IconButton sx={{ p: 0 }} onClick={handleZoomOut}>
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={ZoomOutSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <Slider
        sx={{
          color: "#B5F5EC",
          height: "0.8rem",
          padding: "0.8rem 0",
          "& .MuiSlider-rail": {
            backgroundColor: "rgba(255, 255, 255, 0.20)",
          },
          "& .MuiSlider-thumb": {
            width: "1.6rem",
            height: "1.6rem",
            "&:focus, &:hover, &.Mui-active": {
              boxShadow: "none",
            },
          },
        }}
        value={zoom}
        max={1}
        step={0.01}
        onChange={(e, newValue) => onZoom(newValue as number)}
      ></Slider>
      <IconButton sx={{ p: 0 }} onClick={handleZoomIn}>
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={ZoomInSvg} inheritViewBox></SvgIcon>
      </IconButton>
    </Stack>
  )
}

export default AvatarCropper
