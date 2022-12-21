import { createTheme } from "@mui/material/styles"
import { palette, typographyOptions } from "./typographyOptions"

export const boxShadows = {
  button: {
    default: "none",
    disabled: "none",
    highlighted: "6px 9px 0px 0px #fee7e0",
  },
}

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
}

const theme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette: {
    ...palette,
  },
  typography: typographyOptions,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthLg": {
            maxWidth: "1300px",
          },
        },
      },
    },
    // @ts-ignore
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
          backgroundColor: ownerState.severity && palette[ownerState.severity].light,
          alignItems: "center",
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
          color: `${ownerState.severity && palette[ownerState.severity].main} !important`,
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #C9CBCE",
          "&:before": {
            backgroundColor: "unset",
          },
          "&.MuiPaper-root": {
            boxShadow: "unset",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        content: ({ theme }) => ({
          margin: "3.4rem 0",
          "&.Mui-expanded": {
            margin: "3.4rem 0",
          },
          [theme.breakpoints.down("sm")]: {
            margin: "2.8rem 0",
            "&.Mui-expanded": {
              margin: "2.8rem 0",
            },
          },
        }),
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "block",
          padding: "0 0 3.2rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          fontSize: "2.2rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#00A6F2",
          fontSize: "1.6rem",
          fontWeight: 600,
          cursor: "pointer",
        },
      },
    },
  },
})

export default theme
