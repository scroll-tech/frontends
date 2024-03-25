import React, { Ref, forwardRef } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

// import styles from "./Container.module.css"

export interface Props {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}

const StyledBox = styled<any>(Box, {
  shouldForwardProp: prop => prop !== "scrollable" && prop !== "placeholder" && prop !== "unstyled" && prop !== "horizontal" && prop !== "shadow",
})(({ theme, scrollable, placeholder, unstyled, horizontal, shadow }) => ({
  display: "flex",
  flexDirection: "column",
  gridAutoRows: "max-content",
  overflow: "hidden",
  boxSizing: "border-box",
  appearance: "none",
  outline: "none",
  minWidth: "350px",
  margin: "10px",
  borderRadius: "5px",
  minHeight: "200px",
  transition: "background-color 350ms ease",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  fontSize: "1em",
  background: "transparent",
  ...(scrollable && {
    overflowY: "auto",
  }),
  ...(placeholder && {
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      borderColor: "rgba(0, 0, 0, 0.15)",
    },
  }),
  ...(unstyled && {
    overflow: "visible",
    backgroundColor: "transparent !important",
    border: "none !important",
  }),
  ...(horizontal && {
    width: "100%",
    "& ul": {
      gridAutoFlow: "column",
    },
  }),
  ...(shadow && {
    boxShadow: "0 1px 10px 0 rgba(34, 33, 81, 0.1)",
  }),
  "&:focus-visible": {
    borderColor: "transparent",
    boxShadow: "0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px #4c9ffe",
  },
  "& ul": {
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gridTemplateRows: "repeat(auto-fill, 100px)",
    gap: "22px",
    width: "100%",
    maxWidth: "52rem",
    minHeight: "48rem",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    borderRadius: "16px",
  },
}))

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "5px 20px",
  paddingRight: "8px",
  alignItems: "center",
  justifyContent: "center",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  color: "#fff",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  letterSpacing: "0.24px",
  marginBottom: "1.6rem",
  "&:hover": {
    ".Actions > *": {
      opacity: "1 !important",
    },
  },
}))
export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 3,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <StyledBox
        {...props}
        ref={ref}
        style={
          {
            ...style,
            "--columns": columns,
          } as React.CSSProperties
        }
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? <Header>{label}</Header> : null}
        {placeholder ? children : <ul>{children}</ul>}
      </StyledBox>
    )
  },
)
