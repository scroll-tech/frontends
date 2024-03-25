import * as React from "react"

import { styled } from "@mui/system"

// Assuming the styles from "./Action.module.css" can be replaced or merged here
const StyledButton = styled<any>("button")(
  ({ theme, cursor, active }) => ({
    display: "flex",
    width: "12px",
    padding: "15px",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    touchAction: "none",
    cursor: cursor || "pointer",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    appearance: "none",
    backgroundColor: "transparent",
    WebkitTapHighlightColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      "& svg": {
        fill: "#6f7b88",
      },
    },
    "&:active": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      "& svg": {
        fill: active?.fill || "#788491",
      },
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px #4c9ffe`,
    },
    "& svg": {
      flex: "0 0 auto",
      margin: "auto",
      height: "100%",
      overflow: "visible",
      fill: "#919eab",
    },
  }),
  {
    shouldForwardProp: prop => prop !== "active" && prop !== "cursor",
  },
)

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: React.CSSProperties["cursor"]
}

export const Action = React.forwardRef<HTMLButtonElement, Props>(({ active, cursor, style, ...props }, ref) => {
  // Handle dynamic styles that cannot be directly applied via styled component
  const dynamicStyles = {
    ...style,
    "--fill": active?.fill,
    "--background": active?.background,
    cursor,
  }

  return (
    <StyledButton
      ref={ref}
      {...props}
      cursor={cursor}
      active={active}
      style={dynamicStyles} // Apply dynamic styles as inline styles
    />
  )
})
