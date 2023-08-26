import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

// xs: 0
// sm: 600
// md: 900
// lg: 1200
// xl: 1536

const useCheckViewport = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"))
  const isTabletLandscape = useMediaQuery(theme.breakpoints.between("md", "lg"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // mobile(orientation: portrait)
  const isPortrait = useMediaQuery(theme.breakpoints.down("md"))
  // desktop(orientation: landscape)
  const isLandscape = useMediaQuery(theme.breakpoints.up("md"))

  return { isDesktop, isTabletLandscape, isTablet, isMobile, isPortrait, isLandscape }
}

export default useCheckViewport
