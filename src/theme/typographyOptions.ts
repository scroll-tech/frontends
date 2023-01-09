import { createTheme } from "@mui/material/styles"

const theme = createTheme()

export const palette = {
  // primary: {
  //   main: "#eb7106",
  //   dark: "#F18740",
  // },
  secondary: {
    main: "#595959",
  },
  action: {
    active: "#EB7106",
    selected: "#B32EFF",
    disabled: "white",
  },
  text: {
    primary: "#333333",
    secondary: "#595959",
    placeholder: "#33333380",
    disabled: "#3333334D",
  },
  border: {
    main: "#C9CBCE",
  },
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
}

export const typographyOptions = {
  fontFamily: [
    "SF UI Text",
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
  h2: {
    fontFamily: "Pulp Display",
    fontWeight: 400,
    fontSize: "4.8rem",
    lineHeight: "5.6rem",
    letterSpacing: "-0.26px",
    color: palette.text.primary,
    [theme.breakpoints.down("md")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  h3: {
    fontFamily: "Pulp Display",
    fontWeight: 400,
    fontSize: "3.4rem",
    lineHeight: "4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  h4: {
    fontSize: "3.4rem",
    fontWeight: 400,
    fontFamily: "Pulp Display",
    letterSpacing: "0.25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
  },
  // 用到了
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
    letterSpacing: "-0.3px",
    color: palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
      lineHeight: "2.6rem",
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "1.6rem",
    lineHeight: "2.6rem",
    letterSpacing: "-0.3px",
    color: palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
      lineHeight: "2.6rem",
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "1.4rem",
    lineHeight: "2.6rem",
    letterSpacing: "-0.3px",
    color: palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      fontSize: "1.4rem",
      lineHeight: "2.6rem",
    },
  },
}
