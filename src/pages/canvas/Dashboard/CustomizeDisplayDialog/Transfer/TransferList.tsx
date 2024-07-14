import { AnimateLayoutChanges, SortableContext, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Box, Typography } from "@mui/material"

const animateLayoutChanges: AnimateLayoutChanges = args => defaultAnimateLayoutChanges({ ...args, wasDragging: true })

const TransferList = props => {
  const { id, label, items, children, ...restProps } = props

  const { attributes, isDragging, listeners, setNodeRef, transition, transform } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  })

  return (
    <Box
      ref={setNodeRef}
      sx={{ transition, transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : undefined }}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...restProps}
    >
      <Typography
        sx={{
          fontSize: ["1.6rem", "1.8rem"],
          lineHeight: ["2.4rem"],
          fontWeight: 600,
          textAlign: "center",
          color: "primary.contrastText",
          mb: ["0.8rem", "1.6rem"],
        }}
      >
        {label}
      </Typography>
      <SortableContext items={items}>
        <Box
          id={id}
          sx={[
            {
              display: "grid",
              gridTemplateColumns: ["repeat(auto-fill, minmax(50px, 1fr))", "repeat(auto-fill, minmax(100px, 1fr))"],
              gridAutoRows: "min-content",
              gridGap: "2rem",
              minHeight: ["unset", "40rem"],
              height: ["calc(100% - 3.2rem)", "60rem", "auto"],
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderRadius: "1.6rem",
              padding: "2.4rem",
              overflowY: "auto",
            },
            // theme => ({
            //   [theme.breakpoints.down("sm")]: {
            //     height: "calc(100% - 3.2rem)",
            //   },
            // }),
          ]}
        >
          {children}
        </Box>
      </SortableContext>
    </Box>
  )
}

export default TransferList
