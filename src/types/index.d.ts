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
    singleLineEllipsis: {
      overflow: string
      whiteSpace: string
      textOverflow: string
    }
    multilineEllipsis: {
      display: string
      WebkitBoxOrient: BoxOrient
      WebkitLineClamp: string
      overflow: string
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
    singleLineEllipsis?: {
      overflow: string
      whiteSpace: string
      textOverflow: string
    }
    multilineEllipsis?: {
      display: string
      WebkitBoxOrient: BoxOrient
      WebkitLineClamp: string
      overflow: string
    }
  }
  interface Palette {
    themeBackground: {
      light: string
      dark: string
      normal: string
      highlight: string
      optionHightlight: string
      tag: string
      transparent: string
      brand: string
    }
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
    themeBackground: {
      light: string
      dark: string
      normal: string
      highlight: string
      optionHightlight: string
      tag: string
      transparent: string
      brand: string
    }
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

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    H1: true
    H2: true
    H3: true
    H4: true
    Body1: true
    Body2: true
    Body3: true
  }
}
