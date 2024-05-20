import { Tooltip as MuiTooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"

import useCheckViewport from "@/hooks/useCheckViewport"

const ToolTip = props => {
  const { title, children, ...restProps } = props
  const { isDesktop } = useCheckViewport()
  return (
    <MuiTooltip
      title={title}
      disableFocusListener={!isDesktop}
      disableTouchListener={!isDesktop}
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
      slotProps={{
        tooltip: {
          sx: {
            [`&.${tooltipClasses.tooltip}`]: {
              m: 0,
              p: "1.2rem 1.4rem",
              background: "linear-gradient(180deg, #262626 0%, #111 100%)",
              borderBottom: "2px solid #85E0D1",
              backdropFilter: "blur(2px)",
              borderRadius: "0.8rem",
              fontSize: "1.6rem",
              textAlign: "center",
              fontWeight: 400,
            },
          },
        },
      }}
      {...restProps}
    >
      {children}
    </MuiTooltip>
  )
}

export default ToolTip
