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
  primary: {
    main: "#eb7106",
    dark: "#F18740",
  },
  action: {
    active: "#EB7106",
    hover: "#e8c1ff",
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

const light: ThemeOptions = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette: {
    ...palette,
  },
  // TODO: typographyOptions out of use, side effects can't be determined
  typography: {
    fontFamily: "SF UI Text",
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
            },
          },
        },
      ],
    },
  },
});

export default light;
