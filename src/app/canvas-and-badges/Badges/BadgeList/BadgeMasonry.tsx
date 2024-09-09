import { useEffect, useRef } from "react"
import { usePrevious } from "react-use"
import { AutoSizer, CellMeasurer, CellMeasurerCache, Masonry, WindowScroller } from "react-virtualized"
import "react-virtualized/styles.css"

import useCheckViewport from "@/hooks/useCheckViewport"

type createCellPositionerParams = {
  cellMeasurerCache: CellMeasurerCache
  columnCount: number
  columnWidth: number
  spacer: number
}

type resetParams = {
  columnCount: number
  columnWidth: number
  spacer: number
}

function createCellPositioner({ cellMeasurerCache, columnCount, columnWidth, spacer = 0 }: createCellPositionerParams) {
  let columnHeights

  initOrResetDerivedValues()

  function cellPositioner(index) {
    // Find the shortest column and use it.
    let columnIndex = 0
    for (let i = 1; i < columnHeights.length; i++) {
      if (columnHeights[i] < columnHeights[columnIndex]) {
        columnIndex = i
      }
    }

    const left = columnIndex * (columnWidth + spacer)
    const top = columnHeights[columnIndex] || 0

    columnHeights[columnIndex] = top + cellMeasurerCache.getHeight(index) + spacer

    return {
      left,
      top,
    }
  }

  function initOrResetDerivedValues(): void {
    // Track the height of each column.
    // Layout algorithm below always inserts into the shortest column.
    columnHeights = []
    for (let i = 0; i < columnCount; i++) {
      columnHeights[i] = 0
    }
  }

  function reset(params: resetParams): void {
    columnCount = params.columnCount
    columnWidth = params.columnWidth
    spacer = params.spacer

    initOrResetDerivedValues()
  }

  cellPositioner.reset = reset

  return cellPositioner
}

const BadgeMasonry = props => {
  const { data, columnWidth = 330, gutterSize = 24, overscanByPixels = 600, ItemComponent, onItemClick } = props
  const { isMobile } = useCheckViewport()
  const windowScrollerRef = useRef<any>(null)

  const columnCountRef = useRef(0)

  const cacheRef = useRef(
    new CellMeasurerCache({
      defaultHeight: isMobile ? 320 : 336,
      defaultWidth: 330,
      fixedWidth: true,
    }),
  )
  const cellPositionerRef = useRef<any>(null)
  const masonryRef = useRef<any>(null)

  const preData = usePrevious(data)

  useEffect(() => {
    if (data?.length < preData?.length) {
      cacheRef.current.clearAll()
      resetCellPositioner()
      masonryRef.current.clearCellPositions()
      masonryRef.current.recomputeCellPositions()
    }
  }, [data])

  const calculateColumnCount = containerWidth => {
    columnCountRef.current = Math.floor((containerWidth + gutterSize) / (columnWidth + gutterSize))
  }

  const initCellPositioner = () => {
    if (!cellPositionerRef.current) {
      cellPositionerRef.current = createCellPositioner({
        cellMeasurerCache: cacheRef.current,
        columnCount: columnCountRef.current,
        columnWidth,
        spacer: gutterSize,
      })
    }
  }

  const resetCellPositioner = () => {
    cellPositionerRef.current?.reset({
      columnCount: columnCountRef.current,
      columnWidth,
      spacer: gutterSize,
    })
  }

  const onResize = ({ width }) => {
    calculateColumnCount(width)
    resetCellPositioner()
    masonryRef.current?.recomputeCellPositions()
  }

  const onWindowResize = () => {
    // masonryRef.current?.recomputeCellPositions()
  }

  const cellRenderer = ({ index, key, parent, style }) => {
    return (
      <>
        {data[index]?.badgeContract ? (
          <CellMeasurer cache={cacheRef.current} index={index} key={key} parent={parent}>
            <div style={style}>
              <ItemComponent {...data[index]} onClick={() => onItemClick(data[index])}></ItemComponent>
            </div>
          </CellMeasurer>
        ) : null}
      </>
    )
  }

  const renderMasonry = ({ width, height, scrollTop, isScrolling, onChildScroll }) => {
    calculateColumnCount(width)
    initCellPositioner()

    const masonryWidth = (columnWidth + gutterSize) * (columnCountRef.current - 1) + columnWidth

    return (
      <Masonry
        autoHeight
        cellCount={data.length}
        cellMeasurerCache={cacheRef.current}
        deferredMeasurementCache={cacheRef.current}
        cellPositioner={cellPositionerRef.current}
        cellRenderer={cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={masonryRef}
        scrollTop={scrollTop}
        onScroll={onChildScroll}
        isScrolling={isScrolling}
        keyMapper={index => (data[index] ? data[index].badgeContract : index)}
        width={masonryWidth}
        style={{ margin: "0 auto" }}
      />
    )
  }

  const renderAutoSizer = ({ height, scrollTop, isScrolling, onChildScroll }) => {
    return (
      <AutoSizer disableHeight height={height} onResize={onResize} style={{ width: "100% !important", overflow: "unset !important" }}>
        {({ width }) => renderMasonry({ width, height, scrollTop, isScrolling, onChildScroll })}
      </AutoSizer>
    )
  }

  return (
    <WindowScroller ref={windowScrollerRef} onWindowResize={onWindowResize}>
      {renderAutoSizer}
    </WindowScroller>
  )
}

export default BadgeMasonry
