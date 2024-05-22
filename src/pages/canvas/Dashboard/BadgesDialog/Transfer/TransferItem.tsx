import { useSortable } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

import { Box } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"
import ToolTip from "@/pages/canvas/components/Tooltip"

import Item from "./Item"

const TransferItem = props => {
  const { id, name, image, dragOverlay, containerId } = props

  const { setNodeRef, listeners, isDragging, transform, transition } = useSortable({
    id,
  })
  const { isDesktop } = useCheckViewport()

  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  useEffect(() => {
    if (!dragOverlay) {
      return
    }

    document.body.style.cursor = "grabbing"

    return () => {
      document.body.style.cursor = ""
    }
  }, [dragOverlay])

  return (
    <ToolTip title={<Box sx={{ fontWeight: 600 }}>{name}</Box>} disableHoverListener={!isDesktop}>
      <Box sx={{ cursor: "grab" }}>
        <Item
          sx={{ opacity: containerId === "left" ? 0.6 : 1 }}
          ref={setNodeRef}
          fadeIn={mountedWhileDragging}
          dragging={isDragging}
          listeners={listeners}
          transition={transition}
          transform={transform}
          name={name}
          image={image}
        ></Item>
      </Box>
    </ToolTip>
  )
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)

    return () => clearTimeout(timeout)
  }, [])

  return isMounted
}

export default TransferItem
