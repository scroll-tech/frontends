import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

const breakpoints = createBreakpoints({});

export const paletteOptions = {
  mode: "light",
  primary: {
    light: "#F18740",
    main: "#EB7106",
    dark: "#FEE7E0",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#FFFFFF",
    paper: "#FDF7F9",
  },
  secondary: {
    main: "#595959",
    // light: '#6660777f',
  },
  success: {
    light: "#26BC681A",
    main: "#26BC68",
  },
  warning: {
    light: "#FFF8CB",
    main: "#C14800",
  },
  error: {
    light: "#FFD7E2",
    main: "#DC3347",
  },
  text: {
    primary: "#333333",
    secondary: "#595959",
    placeholder: "#33333380",
    disabled: "#3333334D",
  },
};

export const typographyOptions = {
  fontFamily: "SF UI Text",
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
    [breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
  },
  // 用到了
  h5: {
    fontSize: "2.4rem",
    fontWeight: 600,
    [breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
  // 用到了
  h6: {
    fontSize: "2.0rem",
    fontWeight: 500,
    [breakpoints.down("sm")]: {
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
    [breakpoints.down("sm")]: {
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
