import { makeStyles } from "tss-react/mui"

import { ButtonProps, CircularProgress, Button as ScrollButton } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

interface ScrollButtonProps extends ButtonProps {
  width?: string | number
  color?: "primary" | "secondary" | "dark"
  gloomy?: boolean
  loading?: boolean
  disabled?: boolean
  whiteButton?: boolean
  download?: boolean

  // compatibility
  target?: string
  rel?: string
}

const gColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.main
    case "secondary":
      return "#ffffff"
    case "dark":
      return "#ffffff"
    default:
      return theme.palette.text.primary
  }
}

const cColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.palette.primary.contrastText
    case "secondary":
      return theme.palette.text.primary
    case "dark":
      return "#000000"
    default:
      return theme.palette.primary.contrastText
  }
}

const useStyles = makeStyles<any>()((theme, { width, color, disabled, loading, whiteButton }) => ({
  button: {
    padding: "0",
    width: width ?? "16rem",
    height: "4.8rem",
    fontSize: "1.8rem",
    fontWeight: 600,
    background: gColor(color, theme),
    color: cColor(color, theme),
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      paddingLeft: "4.8rem",
    },
    "&:hover": {
      backgroundColor: gColor(color, theme),
      color: cColor(color, theme),
    },
  },
  buttonDisabled: {
    borderColor: "#EBC28E",
    color: "#EBC28E",
  },
  buttonLoading: {
    gap: "0.4em",
    color: cColor(color, theme),
    backgroundColor: gColor(color, theme),
  },

  icon: {
    width: "5.4rem",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    color: `${cColor(color, theme)} !important`,
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
}))

const Button = (props: ScrollButtonProps) => {
  const { width, sx, color, loading, disabled, gloomy, children, whiteButton, ...restProps } = props
  const { classes, cx } = useStyles({ color, width, disabled, loading, whiteButton })

  const { isMobile } = useCheckViewport()

  return (
    // TODO: allow sx, allow size=small/medium
    // avoid setting both 'disabled' and 'loading' to true.
    <ScrollButton
      classes={{
        root: cx(classes.button, loading && classes.buttonLoading),
      }}
      disabled={loading}
      {...restProps}
    >
      {children} {loading && <CircularProgress sx={{ color: "inherit" }} size={isMobile ? 18 : 24} thickness={4}></CircularProgress>}
    </ScrollButton>
  )
}

export default Button
