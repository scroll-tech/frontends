import type { DraggableSyntheticListeners } from "@dnd-kit/core"
import type { Transform } from "@dnd-kit/utilities"
import React, { useEffect } from "react"

import { keyframes, styled } from "@mui/system"

// import styles from "./Item.module.css"

// Define keyframes for animations
const pop = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

// Styled component for the item wrapper
const StyledWrapper = styled<any>("li")(({ theme, dragOverlay, fadeIn, sorting, transform }) => ({
  display: "flex",
  boxSizing: "border-box",
  transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0) scaleX(${transform?.scaleX || 1}) scaleY(${transform?.scaleY || 1})`,
  transformOrigin: "0 0",
  touchAction: "manipulation",
  ...(fadeIn && {
    animation: `${fadeInAnimation} 500ms ease`,
  }),
  ...(dragOverlay && {
    zIndex: 999,
    animation: `${pop} 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)`,
  }),
}))

// Styled component for the item itself
const StyledItem = styled<any>("div")(({ theme, dragging, handle, dragOverlay, disabled, color }) => ({
  position: "relative",
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  padding: "0",
  backgroundColor: "#fff",
  boxShadow: "0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)",
  outline: "none",
  borderRadius: "50%",
  boxSizing: "border-box",
  listStyle: "none",
  transformOrigin: "50% 50%",
  WebkitTapHighlightColor: "transparent",
  color: "#333",
  fontWeight: "400",
  fontSize: "1rem",
  whiteSpace: "nowrap",
  ...(dragging &&
    !dragOverlay && {
      opacity: 0.5,
    }),
  ...(disabled && {
    color: "#999",
    backgroundColor: "#f1f1f1",
    cursor: "not-allowed",
  }),
  ...(dragOverlay && {
    cursor: "inherit",
    animation: `${pop} 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)`,
  }),
  "&:focus-visible": {
    boxShadow: `0 0 0 2px #4c9ffe`,
  },
  "&:before": color
    ? {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "0",
        height: "100%",
        width: "3px",
        borderTopLeftRadius: "3px",
        borderBottomLeftRadius: "3px",
        backgroundColor: color,
      }
    : {},
}))

export interface Props {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  value: React.ReactNode
  onRemove?(): void
  renderItem?(args: {
    dragOverlay: boolean
    dragging: boolean
    sorting: boolean
    index: number | undefined
    fadeIn: boolean
    listeners: DraggableSyntheticListeners
    ref: React.Ref<HTMLElement>
    style: React.CSSProperties | undefined
    transform: Props["transform"]
    transition: Props["transition"]
    value: Props["value"]
  }): React.ReactElement
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = "grabbing"

        return () => {
          document.body.style.cursor = ""
        }
      }, [dragOverlay])

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <StyledWrapper
          ref={ref}
          dragOverlay={dragOverlay}
          fadeIn={fadeIn}
          sorting={sorting}
          transform={transform}
          style={{ ...wrapperStyle, transition }}
        >
          <StyledItem
            dragging={dragging}
            handle={handle}
            dragOverlay={dragOverlay}
            disabled={disabled}
            color={color}
            style={style}
            {...listeners}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <img alt="item" src={(value as any).image.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1")} />
          </StyledItem>
        </StyledWrapper>
      )
    },
  ),
)
