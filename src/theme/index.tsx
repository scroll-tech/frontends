"use client"

// @ts-ignore
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"

import CssBaseline from "@mui/material/CssBaseline"
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles"

// import darkTheme from "./dark"
import lightTheme from "./light"

const ScrollThemeProvider = ({ children }) => {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: {
      light: lightTheme,
      dark: false,
    },
  })

  // not use StyledEngineProvider, so mui style > tailwind style
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider disableTransitionOnChange theme={theme}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default ScrollThemeProvider
