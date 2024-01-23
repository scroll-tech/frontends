import { createTheme } from "@mui/material/styles"

const theme = createTheme()

export const paletteOptions = {
  primary: {
    light: "#F18740",
    main: "#FF684B",
    dark: "#FFDEB5",
    contrastText: "#FFF8F3",
  },
  secondary: {
    main: "#595959",
  },
  text: {
    primary: "#101010",
    secondary: "#595959",
    disabled: "#FFDEB5",
  },
  // for alert
  info: {
    light: "#E5F6FE",
    main: "#0095DA",
  },
  success: {
    light: "#DFFCF8",
    main: "#0F8E7E",
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
  divider: "#101010",
  background: {
    default: "#FFF",
    paper: "#FFF",
  },
  // TODO: delete
  scaleBackground: {
    primary: "rgba(201, 203, 206, 0.2)",
    second: "#C9CBCE33",
    disabled: "#EBEBEB",
    select: "#C9CBCE33",
    disabledSecondary: "#B4B4B4",
    gradient: "linear-gradient(180deg, rgba(255, 232, 203, 0.74) 0%, rgba(255, 255, 255, 0) 100%)",
  },
  themeBackground: {
    light: "#FFF8F3",
    dark: "#101010",
    normal: "#FFF0DD",
    highlight: "#FFDEB5",
    optionHightlight: "#FFE6C8",
    tag: "#262626",
    transparent: "transparent",
    brand: "#FFEEDA",
  },
  border: {
    main: "#000",
  },
  link: {
    main: "#FF684B",
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
    "TransSansPremium",
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
    fontWeight: 500,
    fontSize: "4.8rem",
    lineHeight: "5.6rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  h3: {
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
    lineHeight: 1.4,
  },
  // body2: {
  //   fontWeight: 400,
  //   fontSize: "1.4rem",
  //   lineHeight: "2.6rem",
  // },
  // button: {
  //   fontSize: "1.8rem",
  //   fontWeight: 700,
  //   textTransform: "capitalize",
  // },

  H1: {
    fontSize: "7.8rem",
    lineHeight: "normal",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem",
    },
  },

  // TODO: not use
  H2: {
    fontSize: "4.8rem",
    lineHeight: "normal",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.2rem",
    },
  },

  // TODO: not use
  H3: {
    fontSize: "4.6rem",
    lineHeight: "normal",
    fontWeight: 500,
  },
  H4: {
    fontSize: "2.4rem",
    lineHeight: 1.4,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  Body1: {
    fontSize: "2.6rem",
    lineHeight: 1.4,
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  // TODO: not use
  Body2: {
    fontSize: "2.4rem",
    lineHeight: "normal",
    fontWeight: 400,
  },
  Body3: {
    fontSize: "2.0rem",
    lineHeight: 1.4,
    fontWeight: 400,
  },
}

export const boxShadowOptions = {
  none: "none",
  sharp: "0px 2px 4px rgba(0,0,0,.1)",
  buttonHover: "#FEE7E0 0.4rem 0.4rem",
  select: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  tile: "2px 2px 10px 2px rgba(131, 131, 131, 0.4)",
}
