import classNames from "classnames"
import React, { Ref, forwardRef } from "react"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

import { Handle, Remove } from "../Item"
import styles from "./Container.module.css"

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

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gridAutoRows: "max-content",
  overflow: "hidden",
  boxSizing: "border-box",
  appearance: "none",
  outline: "none",
  minWidth: "35rem",
  margin: "1rem",
  borderRadius: "0.5rem",
  minHeight: "20rem",
  transition: "background-color 350ms ease",
  // backgroundColor: "rgba(246, 246, 246, 1)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  fontSize: "1em",
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
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow,
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? <div className={styles.Header}>{label}</div> : null}
        {placeholder ? children : <ul>{children}</ul>}
      </StyledBox>
    )
  },
)
