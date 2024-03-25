import { useSortable } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

import { Box } from "@mui/material"

import ToolTip from "@/pages/skelly/components/Tooltip"

import Item from "./Item"

const TransferItem = props => {
  const { id, name, image, dragOverlay } = props

  const { setNodeRef, listeners, isDragging, transform, transition } = useSortable({
    id,
  })

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
    <ToolTip title={<Box sx={{ fontWeight: 600 }}>{name}</Box>}>
      <Box sx={{ cursor: "grab" }}>
        <Item
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
