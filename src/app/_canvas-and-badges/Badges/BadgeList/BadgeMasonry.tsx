"use client"

import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual"
import { useLayoutEffect, useRef } from "react"

import useCheckViewport from "@/hooks/useCheckViewport"

const BadgeMasonry = props => {
  const { data, columnWidth = 330, gutterSize = 24, ItemComponent, onItemClick } = props
  const { isMobile } = useCheckViewport()

  const rowHeight = useRef(isMobile ? 320 : 336)
  const rowCount = useRef(4)

  const parentOffsetRef = useRef<number>(0)
  const parentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
    rowCount.current = Math.floor((parentRef.current?.clientWidth as number) / columnWidth)
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => rowHeight.current,
    overscan: 8,
    gap: gutterSize,
    scrollMargin: parentOffsetRef.current ?? 0,
  })

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    estimateSize: () => columnWidth,
    count: rowCount.current,
    gap: gutterSize,
    getScrollElement: () => parentRef.current,
  })

  const columnItems = columnVirtualizer.getVirtualItems()

  return (
    <div ref={parentRef}>
      <div
        style={{
          height: `${(Math.ceil(data.length / rowCount.current) - 1) * (gutterSize + rowHeight.current) + rowHeight.current}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map(row => (
          <>
            <div
              key={row.key}
              data-index={row.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: `translate(-50%, ${row.start - virtualizer.options.scrollMargin}px)`,
                display: "flex",
                gap: `${gutterSize}px`,
                width: rowCount.current * columnWidth + (rowCount.current - 1) * gutterSize,
              }}
            >
              {columnItems.map(column => {
                if (!data[row.index * rowCount.current + column.index]) return null
                return (
                  <div
                    key={column.key}
                    style={{
                      minHeight: row.size,
                      width: column.size,
                    }}
                  >
                    <ItemComponent
                      {...data[row.index * rowCount.current + column.index]}
                      onClick={() => onItemClick(data[row.index * rowCount.current + column.index])}
                    ></ItemComponent>
                  </div>
                )
              })}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default BadgeMasonry
