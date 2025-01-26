"use client"

// @ts-ignore
import { ThemeProvider, createTheme } from "@mui/material/styles"

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
    <ThemeProvider disableTransitionOnChange theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default ScrollThemeProvider
