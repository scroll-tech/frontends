"use client"

import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { getInitColorSchemeScript } from "@mui/material/styles"

// import darkTheme from "./dark"
import lightTheme from "./light"

const ScrollThemeProvider = ({ children }) => {
  const theme = extendTheme({
    colorSchemes: {
      light: lightTheme,
      dark: lightTheme,
    },
  })

  // not use StyledEngineProvider, so mui style > tailwind style
  return (
    <CssVarsProvider theme={theme}>
      {getInitColorSchemeScript({
        // colorSchemeStorageKey: "mui-mode",
        // defaultMode: "system",
      })}
      {children}
    </CssVarsProvider>
  )
}

export default ScrollThemeProvider
