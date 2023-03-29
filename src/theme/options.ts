import { createTheme } from "@mui/material/styles"

const theme = createTheme()

export const paletteOptions = {
  primary: {
    light: "#F18740",
    main: "#EB7106",
    dark: "#FEE7E0",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#595959",
  },
  text: {
    primary: "#333333",
    secondary: "#595959",
    disabled: "#B4B4B4",
  },
  // for alert
  info: {
    light: "#E5F6FE",
    main: "#0095DA",
  },
  success: {
    light: "#E0FEE7",
    main: "#00A82A",
  },
  warning: {
    light: "#FFF8CB",
    main: "#C14800",
  },
  error: {
    light: "#FFD7E2",
    main: "#DC3347",
  },
  action: {
    disabled: "rgba(51, 51, 51, 0.3)",
    disabledBackground: "rgba(51, 51, 51, 0.1)",
  },
  divider: "#C9CBCE",
  background: {
    default: "#FFF",
    paper: "#FFF",
  },
  // custom
  scaleBackground: {
    primary: "rgba(201, 203, 206, 0.2)",
    second: "#C9CBCE33",
    disabled: "#EBEBEB",
    select: "#C9CBCE33",
    disabledSecondary: "#B4B4B4",
    gradient: "linear-gradient(180deg, rgba(255, 232, 203, 0.74) 0%, rgba(255, 255, 255, 0) 100%)",
  },
  border: {
    main: "#C9CBCE",
  },
  link: {
    main: "#00A6F2",
  },
  // for tag
  tagSuccess: {
    light: "#2FCE741A",
    main: "#2FCE74",
    contrastText: "#FFFFFF",
  },
  tagWarning: {
    light: "#ffb21c1A",
    main: "#FFB21C",
    contrastText: "#FFFFFF",
  },
  tagCommitted: {
    light: "#29C2CE1A",
    main: "#29C2CE",
    contrastText: "#FFFFFF",
  },
  tagSkipped: {
    light: "#BD63E21A",
    main: "#BD63E2",
    contrastText: "#FFFFFF",
  },
  tagUnknown: {
    light: "#FF4F641A",
    main: "#FF4F64",
    contrastText: "#FFFFFF",
  },
}

export const typographyOptions = {
  fontFamily: [
    "Inter",
    "system-ui",
    "BlinkMacSystemFont",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ].join(","),
  h1: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "4.8rem",
    lineHeight: "5.6rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  h3: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "3.4rem",
    lineHeight: "4rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  h4: {
    fontSize: "3.4rem",
    fontWeight: 500,
    fontFamily: "Inter",
    // letterSpacing: "0.25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
  },
  h5: {
    fontSize: "2.4rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  h6: {
    fontSize: "2.0rem",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },

  subtitle1: {
    fontSize: "2rem",
    lineHeight: "3.2rem",
    // color: palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      lineHeight: "2.6rem",
    },
  },
  subtitle2: {
    fontSize: "1.6rem",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
      fontWeight: 500,
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "1.6rem",
    lineHeight: "2.6rem",
  },
  body2: {
    fontWeight: 400,
    fontSize: "1.4rem",
    lineHeight: "2.6rem",
  },
}

export const boxShadowOptions = {
  none: "none",
  sharp: "0px 2px 4px rgba(0,0,0,.1)",
  buttonHover: "#FEE7E0 0.4rem 0.4rem",
  select: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  tile: "2px 2px 10px 2px rgba(131, 131, 131, 0.4)",
}
