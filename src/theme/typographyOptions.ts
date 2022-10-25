import { createTheme } from "@mui/material/styles";
const theme = createTheme();

export const typographyOptions = {
  fontFamily: [
    "SF UI Text",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  h1: {
    fontSize: "8.2rem",
    fontWeight: 300,
  },
  h2: {
    fontSize: "6.0rem",
    fontWeight: 300,
  },
  h3: {
    fontSize: "4.1rem",
    fontWeight: 400,
  },
  // 用到了
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
  h5: {
    fontSize: "2.4rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
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
    fontSize: "1.6rem",
    fontWeight: 600,
  },
  // 用到了
  subtitle2: {
    fontSize: "1.6rem",
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  // 用到了
  body1: {
    fontSize: "1.6rem",
    fontWeight: 400,
  },
  body2: {
    fontSize: "1.2rem",
    fontWeight: 400,
  },
  button: {
    fontSize: "1.8rem",
    fontWeight: 700,
    textTransform: "capitalize",
  },
};
