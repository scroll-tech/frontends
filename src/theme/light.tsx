import type {} from "@mui/lab/themeAugmentation"
import { createTheme, lighten } from "@mui/material/styles"

import { boxShadowOptions, paletteOptions, typographyOptions } from "./options"

const defaultTransition = "all 0.15s ease-out"

const lightTheme = createTheme({
  // check in bridge
  singleLineEllipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  multilineEllipsis: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "4",
    overflow: "hidden",
  },
  shape: {
    borderRadius: 27,
  },
  palette: paletteOptions,
  typography: typographyOptions,
  // diferrent from raw shadows
  boxShadows: boxShadowOptions,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          maxWidth: "152rem !important",
          [theme.breakpoints.up("xs")]: {
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
          [theme.breakpoints.up("md")]: {
            paddingLeft: "6rem",
            paddingRight: "6rem",
          },
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.4rem",
          borderRadius: "0.6rem",
        },
      },
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 10000,
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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontSize: "2rem",
          fontWeight: 500,
          lineHeight: "normal",
          padding: "0 3.5rem",
          height: "4.6rem",
          textTransform: "inherit",
          borderRadius: "2.3rem",
          backgroundColor: "#f0f0f0",
          boxShadow: boxShadowOptions.none,
          "&:hover": {
            boxShadow: boxShadowOptions.none,
            backgroundColor: "#5B5B5B",
            color: paletteOptions.primary.contrastText,
          },
          "@media(max-width: 600px)": {
            padding: 0,
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: paletteOptions.primary.main,
            "&:hover": {
              backgroundColor: paletteOptions.primary.main,
            },
          },
        },
        {
          props: { variant: "contained", color: "info" },
          style: {
            backgroundColor: paletteOptions.themeBackground.normal,
            color: paletteOptions.text.primary,
            "&:hover": {
              backgroundColor: paletteOptions.themeBackground.normal,
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderColor: paletteOptions.text.primary,
            color: paletteOptions.text.primary,
            backgroundColor: paletteOptions.background.default,
            "&:hover": {
              color: paletteOptions.primary.main,
              backgroundColor: paletteOptions.background.default,
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            borderColor: paletteOptions.primary.main,
            color: paletteOptions.primary.main,
            backgroundColor: paletteOptions.background.default,
            width: "21.5rem",
            "&:hover": {
              backgroundColor: paletteOptions.background.default,
              borderColor: paletteOptions.primary.main,
            },
          },
        },
        {
          props: { disabled: true },
          style: {
            border: "none !important",
            color: paletteOptions.action.disabled,
            backgroundColor: paletteOptions.action.disabledBackground,
          },
        },
      ],
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          width: "15rem",
          height: "4.4rem",
          fontSize: "1.6rem",
          fontWeight: 600,
          borderRadius: "0.5rem",
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: paletteOptions.primary.main,
            "&:hover": {
              backgroundColor: lighten(paletteOptions.primary.main, 0.1),
            },
          },
        },
        {
          props: { variant: "contained", color: "primary", loading: true },
          style: {
            backgroundColor: `${paletteOptions.primary.main} !important`,
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "1.8rem",
          transition: defaultTransition,
        },
      },
    },
    // select dropdown
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: boxShadowOptions.none,
        },
      },
    },

    // default body1
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          H1: "h1",
          H2: "h2",
          H3: "h3",
          H4: "h4",
          Body1: "p",
          Body2: "p",
          Body3: "p",
        },
      },
      styleOverrides: {
        root: {
          cursor: "default",
          transition: defaultTransition,
          color: paletteOptions.text.primary,
        },
        gutterBottom: {
          marginBottom: "0.7rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-last-of-type(1) .MuiTableCell-body": {
            borderBottom: "unset",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: paletteOptions.divider,
          [theme.breakpoints.down("sm")]: {
            padding: "1.6rem 2.4rem",
          },
        }),
        head: {
          color: paletteOptions.text.secondary,
          fontSize: "1.4rem",
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          [theme.breakpoints.down("sm")]: {
            margin: "0 1.6rem",
          },
        }),
      },
    },
    // end
    MuiAlert: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: "1rem",
          fontSize: "1.6rem",
          lineHeight: "normal",
          padding: "1.2rem 2.5rem",
          width: "100%",
          boxSizing: "border-box",
          color: ownerState.severity && paletteOptions[ownerState.severity].main,
          backgroundColor: ownerState.severity && paletteOptions[ownerState.severity].light,
          alignItems: "center",
        }),
        icon: ({ theme, ownerState }) => ({
          display: "flex",
          alignItems: "center",
          fontSize: "2.4rem",
          marginRight: "1.8rem",
          padding: 0,
          color: `${ownerState.severity && paletteOptions[ownerState.severity].main} !important`,
        }),
        message: {
          padding: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: `1px solid ${theme.palette.border.main}`,
          "&:before": {
            backgroundColor: "unset",
          },
          "&.MuiPaper-root": {
            boxShadow: "unset",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }),
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
        root: ({ theme }) => ({
          color: theme.palette.link.main,
          fontSize: "1.6rem",
          fontWeight: 600,
          cursor: "pointer",
        }),
      },
    },
  },
})

export default lightTheme
