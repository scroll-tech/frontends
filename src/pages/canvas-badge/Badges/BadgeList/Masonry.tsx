import { useRef } from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, Masonry, WindowScroller } from "react-virtualized"
import { makeStyles } from "tss-react/mui"

// import { keyframes } from "@mui/system"

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

// const Fade = keyframes`
//   to {opacity:1;transform: translateY(0);}
// `

const useStyles = makeStyles()(theme => ({
  listRoot: {
    gridRow: "2 / 3",
    gridColumn: "2 / 4",

    [theme.breakpoints.down("md")]: {
      gridRow: "3 / 4",
      gridColumn: "1 / 3",
    },
  },
  item: {
    // opacity: 0,
    // transform: "translateY(20px)",
    // animation: `${Fade} 0.2s forwards`,
  },
}))

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

const cache = new CellMeasurerCache({
  defaultHeight: 320,
  defaultWidth: 330,
  fixedWidth: true,
})

const GridExample = props => {
  const { data, columnWidth = 330, gutterSize = 24, overscanByPixels = 600, ItemComponent } = props
  const { classes } = useStyles()

  const masonryRef = useRef<any>(null)

  const windowScrollerRef = useRef<any>(null)

  const columnCountRef = useRef(0)
  const cellPositionerRef = useRef<any>()

  // useEffect(() => {
  //   if (preData?.length) {
  //     windowScrollerRef.current?.updatePosition()
  //   }
  // }, [data, preData])

  const calculateColumnCount = containerWidth => {
    columnCountRef.current = Math.floor((containerWidth + gutterSize) / (columnWidth + gutterSize))
  }

  const resetCellPositioner = () => {
    if (!cellPositionerRef.current) {
      cellPositionerRef.current = createCellPositioner({
        cellMeasurerCache: cache,
        columnCount: columnCountRef.current,
        columnWidth,
        spacer: gutterSize,
      })
    } else {
      cellPositionerRef.current?.reset({
        columnCount: columnCountRef.current,
        columnWidth,
        spacer: gutterSize,
      })
    }
  }

  const onResize = ({ width }) => {
    calculateColumnCount(width)
    resetCellPositioner()
    masonryRef.current?.recomputeCellPositions()
  }

  const onAutoSizerResize = ({ width }) => {}

  const onWindowResize = ({ width, height }) => {
    resetCellPositioner()
    masonryRef.current?.recomputeCellPositions()
  }

  const cellRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style} className={classes.item}>
          <ItemComponent {...data[index]}></ItemComponent>
        </div>
      </CellMeasurer>
    )
  }

  const renderMasonry = ({ width, height, scrollTop, isScrolling, onChildScroll }) => {
    onResize({ width })

    const masonryWidth = (columnWidth + gutterSize) * (columnCountRef.current - 1) + columnWidth

    return (
      <Masonry
        autoHeight
        cellCount={data.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositionerRef.current}
        cellRenderer={cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={masonryRef}
        scrollTop={scrollTop}
        onScroll={onChildScroll}
        isScrolling={isScrolling}
        deferredMeasurementCache={cache}
        keyMapper={index => data[index].name}
        width={masonryWidth}
        style={{ margin: "0 auto" }}
      />
    )
  }

  const renderAutoSizer = ({ height, scrollTop, isScrolling, onChildScroll }) => {
    return (
      <AutoSizer disableHeight onResize={onAutoSizerResize} style={{ width: "min-content !important", overflow: "unset !important" }}>
        {({ width }) => renderMasonry({ width, height, scrollTop, isScrolling, onChildScroll })}
      </AutoSizer>
    )
  }

  // const _resetList = () => {
  //   const ROW_HEIGHTS = [25, 50, 75, 100]

  //   data.forEach(datum => {
  //     datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)]
  //   })

  //   cache.clearAll()
  //   _resetCellPositioner()
  //   _masonryRef.current.clearCellPositions()
  // }

  return (
    <WindowScroller onResize={onWindowResize} ref={windowScrollerRef}>
      {renderAutoSizer}
    </WindowScroller>
  )
}

export default GridExample
