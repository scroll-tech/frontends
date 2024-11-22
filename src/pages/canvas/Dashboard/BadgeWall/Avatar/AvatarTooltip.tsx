import { Box } from "@mui/material"

import Tooltip from "@/pages/canvas/components/Tooltip"

const AvatarTooltip = props => {
  const { children, title } = props
  return (
    <Tooltip
      title={title}
      followCursor
      PopperProps={{
        popperOptions: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: ({ placement, reference, popper }) => {
                  if (placement === "bottom") {
                    return [popper.width / 4, 27]
                  } else {
                    return [popper.width / 4, 12]
                  }
                },
              },
            },
          ],
        },
      }}
    >
      <Box>{children}</Box>
    </Tooltip>
  )
}

export default AvatarTooltip
