import { FC, ReactNode } from "react"
import { makeStyles } from "tss-react/mui"

import MuiTextField, { StandardTextFieldProps } from "@mui/material/TextField"

type LargeTextFieldProps = {
  units?: string | ReactNode
  centerAlign?: boolean | undefined
  leftAlign?: boolean | undefined
  defaultShadow?: boolean | undefined
  smallFontSize?: boolean
} & StandardTextFieldProps

const useStyles = makeStyles()(theme => {
  return {
    root: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    adornment: {
      width: "auto",
      textAlign: "right",
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.typography.subtitle2.fontSize,
      },
    },
  }
})

const useInputStyles = makeStyles<any>()((theme, { leftAlign, centerAlign }) => ({
  root: {
    transition: "all 0.15s ease-out",
    width: "100%",
  },
  input: {
    textAlign: leftAlign ? "left" : centerAlign ? "center" : "right",
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.palette.text.primary,
    textOverflow: "clip",
    padding: "6px 4px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
    },
  },
}))

const LargeTextField: FC<LargeTextFieldProps> = props => {
  const { className, units, leftAlign = false, centerAlign, sx, ...textFieldProps } = props
  const { classes, cx } = useStyles()
  const { classes: inputStyles } = useInputStyles({
    leftAlign,
    centerAlign,
  })

  return (
    <MuiTextField
      className={cx(classes.root, className)}
      variant="standard"
      autoComplete="off"
      // disableUnderline
      InputProps={{
        classes: inputStyles,
        disableUnderline: true,
        sx,
      }}
      {...textFieldProps}
    />
  )
}

export default LargeTextField
