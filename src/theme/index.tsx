"use client"

import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme } from "@mui/material/styles"

import darkTheme from "./dark"
import lightTheme from "./light"

const ScrollThemeProvider = ({ children }) => {
  const theme = extendTheme({
    colorSchemes: {
      light: lightTheme,
      dark: darkTheme,
    },
  })

  // not use StyledEngineProvider, so mui style > tailwind style
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      {children}
    </CssVarsProvider>
  )
}

export default ScrollThemeProvider
