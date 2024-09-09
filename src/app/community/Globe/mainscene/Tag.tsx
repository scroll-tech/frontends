import React, { useEffect, useRef } from "react"
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"

import SvgIcon from "@mui/material/SvgIcon"
import { styled } from "@mui/material/styles"

import ExternalSvg from "@/assets/svgs/header/External.svg"

interface TagProps {
  data: {
    name?: string
    eventName?: string
    cover?: string
    city?: string
    eventInfo: any
  }
  direction?: "up" | "down" | "left" | "right"
  onTagReady?: (tag: CSS2DObject) => void
}

const EventContainer = styled("div")({
  position: "relative",
  width: "9px",
  height: "9px",
  zIndex: "999 !important",
})

const Circle = styled("div")({
  width: "9px",
  height: "9px",
  borderRadius: "50%",
  border: "1px solid #101010",
  position: "relative",
  background: "#ffffff",
  zIndex: 99,
})

const Title = styled("div")(() => ({
  position: "absolute",
  width: "fit-content",
  fontSize: "14px",
  color: "#101010",
  padding: "2px 9px",
  borderRadius: "20px",
  border: "1px solid #101010",
  background: "#d2fcf6",
  whiteSpace: "nowrap",
  transform: "translate(-50%, -60px)",
  fontFamily: "var(--developer-page-font-family)",
}))

const Line = styled("div")<{ direction?: string }>(({ direction }) => ({
  position: "absolute",
  width: "1px",
  height: "70px",
  backgroundColor: "#101010",
  top: "60%",
  left: "50%",
  transformOrigin: "top",
  transform:
    direction === "up"
      ? "translateY(-100%) rotate(0deg)"
      : direction === "left"
        ? "rotate(-270deg)"
        : direction === "right"
          ? "rotate(-90deg)"
          : "none",
}))

const EndDiv = styled("div")<{ direction?: string }>(({ direction }) => ({
  width: "183px",
  height: "140px",
  position: "absolute",
  background: "#ffeeda",
  borderRadius: "10px",
  border: "1px solid #101010",
  overflow: "hidden",
  zIndex: 20,
  top: direction === "up" ? "-60px" : "50%",
  bottom: direction === "down" ? "-60px" : undefined,
  left: direction === "left" ? "-60px" : undefined,
  right: direction === "right" ? "-60px" : undefined,
  transform:
    direction === "up"
      ? "translate(-50%, -100%)"
      : direction === "down"
        ? "translate(-50%, 50%)"
        : direction === "left"
          ? "translate(-100%, -50%)"
          : direction === "right"
            ? "translate(100%, -50%)"
            : "none",
}))

const EndDivImage = styled("img")({
  margin: 0,
  padding: 0,
  objectFit: "contain",
  width: "183px",
  height: "110px",
  borderBottom: "1px solid #101010",
  outline: "none",
  display: "block",
  background: "#fff",
})

const EndDivText = styled("a")(() => ({
  margin: 0,
  display: "block",
  textAlign: "center",
  lineHeight: "30px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "0 6px",
  fontFamily: "var(--developer-page-font-family)",
  "&:hover": {
    cursor: "pointer",
    color: "#ff684b",
    "& svg": {
      opacity: 1,
      marginLeft: "0.8rem !important",
      // left: "0.8rem",
    },
  },
}))

const Tag: React.FC<TagProps> = ({ data, direction, onTagReady }) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (divRef.current && onTagReady) {
      const tagObject = new CSS2DObject(divRef.current)
      setTimeout(() => {
        onTagReady(tagObject)
      }, 0)
    }
  }, [onTagReady])

  return (
    <EventContainer ref={divRef}>
      <Circle>
        <Title>{data?.city || data?.name}</Title>
      </Circle>
      <Line direction={direction} />
      <EndDiv direction={direction}>
        <EndDivImage alt="image" src={`/imgs/community/globe/${data?.cover}`} />
        <EndDivText href={data?.eventInfo.website}>
          {data?.eventName || ""}{" "}
          <SvgIcon
            sx={{
              fontSize: "1rem",
              marginLeft: "0 !important",
              transition: "all 0.3s ease",
              position: "absolute",
              bottom: "8px",
              opacity: 0,
            }}
            component={ExternalSvg}
            inheritViewBox
          ></SvgIcon>
        </EndDivText>
      </EndDiv>
    </EventContainer>
  )
}

export default Tag
