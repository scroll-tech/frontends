export {}

declare global {
  interface Window {
    scrollRequest: (url: string, options?: object) => Promise<T>
  }

  interface Error {
    message: string
    stack?: string
    status: number
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    boxShadows: {
      none: string
      sharp: string
      buttonHover: string
      select: string
      tile: string
    }
  }
  interface ThemeOptions {
    boxShadows?: {
      none: string
      sharp: string
      buttonHover: string
      select: string
      tile: string
    }
  }
  interface Palette {
    link: {
      main: string
    }
    border: {
      main: string
    }
    scaleBackground: {
      primary: string
      secondary: string
      disabled: string
      select: string
      disabledSecondary: string
      gradient: string
    }
    tagSuccess: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tagWarning: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tagCommitted: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tagSkipped: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
    tagUnknown: {
      light: string
      main: string
      dark: string
      contrastText: string
    }
  }

  interface PaletteOptions {
    link?: {
      main?: string
    }
    border?: {
      main?: string
    }
    scaleBackground?: {
      primary?: string
      secondary?: string
      disabled?: string
      select?: string
      disabledSecondary?: string
      gradient?: string
    }
    tagSuccess?: {
      light?: string
      main?: string
      dark?: string
      contrastText?: string
    }
    tagWarning?: {
      light?: string
      main?: string
      dark?: string
      contrastText?: string
    }
    tagCommitted?: {
      light?: string
      main?: string
      dark?: string
      contrastText?: string
    }

    tagSkipped?: {
      light?: string
      main?: string
      dark?: string
      contrastText?: string
    }
    tagUnknown?: {
      light?: string
      main?: string
      dark?: string
      contrastText?: string
    }
  }
}
