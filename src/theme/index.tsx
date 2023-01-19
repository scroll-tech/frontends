import { useMemo } from "react"

import { ThemeProvider, createTheme } from "@mui/material/styles"

// import useMediaQuery from "@mui/material/useMediaQuery"
import darkTheme from "./dark"
import lightTheme from "./light"

const prefersDarkMode = false

const ScrollThemeProvider = ({ children }) => {
  // TODO: need support dark mode
  // const aa = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(() => createTheme(prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode])

  // not use StyledEngineProvider, so mui style > tailwind style
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ScrollThemeProvider
