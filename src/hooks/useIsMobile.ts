import { isMobile } from "react-device-detect"

import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

// sm, width < 600

const useIsMobile = (breakpoint = "sm") => {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down(breakpoint))

  return {
    isMobileView,
    isMobileDevice: isMobile,
  }
}

export default useIsMobile
