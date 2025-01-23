import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const Container: any = styled<any>(Box, { shouldForwardProp: prop => prop !== "gridNum" })(({ theme, badgewidth, gridNum }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "calc(var(--vh, 1vh) * 100 - 6.5rem)",
  backgroundColor: "#101010",
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255, 0.3) 1px, transparent 1px), linear-gradient( rgba(255,255,255, 0.3) 1px, transparent 1px)",
  backgroundSize: `${badgewidth}px ${badgewidth}px`,
  backgroundPosition: `calc(50% - ${badgewidth / 2}px) calc(50% - ${badgewidth / 2}px)`,

  "&::before, &::after": {
    content: "''",
    height: "100%",
    position: "absolute",
    top: 0,
    width: `calc((100vw - ${badgewidth * gridNum}px) / 2)`,
    zIndex: 42,

    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: `calc((var(--vh, 1vh) * 100 - ${gridNum * badgewidth}px) / 2)`,
    },
  },
  "&::before": {
    background: "linear-gradient(90deg, #101010 70%, rgba(16, 16, 16, 0) 100%)",
    left: 0,
    [theme.breakpoints.down("md")]: {
      background: "linear-gradient(#101010 75%,  rgba(16, 16, 16, 0) 100%)",
    },
  },
  "&::after": {
    background: "linear-gradient(270deg, #101010 70%, rgba(16, 16, 16, 0) 100%)",
    right: 0,
    [theme.breakpoints.down("md")]: {
      background: "linear-gradient(rgba(16, 16, 16, 0) 0%, #101010 20%)",
      top: "unset",
      bottom: 0,
    },
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "-6.2rem",
    height: "calc(var(--vh, 1vh) * 100)",
  },
}))

const GridBg = props => {
  const { children, ...restProps } = props

  return <Container {...restProps}>{children}</Container>
}

export default GridBg
