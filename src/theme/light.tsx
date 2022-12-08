import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";

export const boxShadows = {
  button: {
    default: "none",
    disabled: "none",
    highlighted: "6px 9px 0px 0px #fee7e0",
  },
};

const palette = {
  // primary: {
  //   main: "#eb7106",
  //   dark: "#F18740",
  // },
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
};

const colors = {
  charcoal: {
    DEFAULT: "#333333",
    dark: "#333333",
    light: "#333333",
  },
  "charcoal-50": {
    DEFAULT: "#33333380",
    dark: "#33333380",
    light: "#33333380",
  },
  "charcoal-30": {
    DEFAULT: "#3333334d",
    dark: "#3333334d",
    light: "#3333334d",
  },
  "charcoal-10": {
    DEFAULT: "#3333331a",
    dark: "#3333331a",
    light: "#3333331a",
  },
  orange: {
    DEFAULT: "#eb7106",
    dark: "#eb7106",
    light: "#eb7106",
  },
};

const theme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette: {
    ...palette,
  },
  typography: {
    fontFamily: [
      "SF UI Text",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ].join(","),
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1300px",
          },
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(51, 51, 51, 0.1)",
          },
        },
        loadingIndicator: {
          color: "rgba(51, 51, 51, 0.3)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.4rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
          height: "3.8rem",
          borderRadius: "1.9rem",
          padding: "0 1.6rem",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "1",
          padding: "16px 28px",
          textTransform: "inherit",
          whiteSpace: "nowrap",
          "&:hover": {
            boxShadow: "#FEE7E0 0.4rem 0.4rem",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: boxShadows.button.default,
            lineHeight: "18px",
            background: "#EB7106",
            "&:hover": {
              background: "#F18740",
              color: "#ffffff",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            background: "#ffffff",
            borderColor: colors.charcoal.DEFAULT,
            color: colors.charcoal.DEFAULT,
            border: `1px solid ${colors.charcoal.DEFAULT}`,
            "&:hover": {
              background: "#ffffff",
              color: colors.orange.DEFAULT,
              border: `1px solid ${colors.orange.DEFAULT}`,
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            background: "#ffffff",
            borderColor: colors.orange.DEFAULT,
            color: colors.orange.DEFAULT,
            border: `1px solid ${colors.orange.DEFAULT}`,
            width: "21.5rem",
            "&:hover": {
              background: "#ffffff",
              color: colors.orange.DEFAULT,
              border: `1px solid ${colors.orange.DEFAULT}`,
            },
          },
        },
      ],
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: "1rem",
          fontSize: "1.6rem",
          lineHeight: "2.6rem",
          padding: "2rem",
          width: "100%",
          boxSizing: "border-box",
          color: ownerState.severity && palette[ownerState.severity].main,
          backgroundColor:
            ownerState.severity && palette[ownerState.severity].light,
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center",
            padding: " 1.6rem 3rem",
          },
        }),
        icon: ({ theme, ownerState }) => ({
          display: "flex",
          alignItems: "center",
          fontSize: "2.4rem",
          marginRight: "1.8rem",
          padding: 0,
          color: `${ownerState.severity &&
            palette[ownerState.severity].main} !important`,
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            marginRight: 0,
          },
        }),
        message: {
          padding: 0,
        },
      },
    },
  },
});

theme.typography.h2 = {
  fontFamily: [
    "Pulp Display",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Helvetica Neue",
  ].join(","),
  fontWeight: 400,
  fontSize: "4.8rem",
  lineHeight: "5.6rem",
  letterSpacing: "-0.26px",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
    lineHeight: "3.2rem",
  },
};

theme.typography.h3 = {
  fontFamily: [
    "Pulp Display",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Helvetica Neue",
  ].join(","),
  fontWeight: 400,
  fontSize: "3.4rem",
  lineHeight: "4rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
    lineHeight: "3.2rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: "2rem",
  lineHeight: "3.2rem",
  letterSpacing: "-0.3px",
  color: palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
    lineHeight: "2.6rem",
  },
};

theme.typography.body1 = {
  fontWeight: 400,
  fontSize: "1.6rem",
  lineHeight: "2.6rem",
  letterSpacing: "-0.3px",
  color: palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.6rem",
    lineHeight: "2.6rem",
  },
};

theme.typography.body2 = {
  fontWeight: 400,
  fontSize: "1.4rem",
  lineHeight: "2.6rem",
  letterSpacing: "-0.3px",
  color: palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
    lineHeight: "2.6rem",
  },
};

export default theme;
