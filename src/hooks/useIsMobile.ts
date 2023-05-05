import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const useIsMobile = () => {
  const theme = useTheme()
  // width < 600
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  return isMobile
}

export default useIsMobile
