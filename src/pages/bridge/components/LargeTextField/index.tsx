import { FC, ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

type LargeTextFieldProps = {
  units?: string | ReactNode;
  centerAlign?: boolean | undefined;
  leftAlign?: boolean | undefined;
  defaultShadow?: boolean | undefined;
  smallFontSize?: boolean;
} & TextFieldProps;

const useStyles = makeStyles()((theme) => {
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
      [theme.breakpoints.down("xs")]: {
        fontSize: theme.typography.subtitle1.fontSize,
      },
    },
  };
});

const useInputStyles = makeStyles<any>()(
  (theme, { leftAlign, centerAlign }) => ({
    "@global": {
      "@keyframes loadingEffect": {
        "0%": {
          opacity: 0.9,
        },
        "50%": {
          opacity: 0.3,
        },
        "100%": {
          opacity: 0.9,
        },
      },
    },
    root: {
      transition: "all 0.15s ease-out",
      borderRadius: "1rem",
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        padding: ".5rem .6rem",
        fontSize: theme.typography.subtitle2.fontSize,
      },
    },
    input: {
      textAlign: leftAlign ? "left" : centerAlign ? "center" : "right",
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.h4.fontWeight,
      color: theme.palette.text.primary,
      textOverflow: "clip",
      padding: "6px 4px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.4rem",
      },
    },
    focused: {
      borderRadius: "1rem",
    },
  })
);

const LargeTextField: FC<LargeTextFieldProps> = (props) => {
  const {
    className,
    units,
    leftAlign = false,
    centerAlign,
    ...textFieldProps
  } = props;
  const { classes, cx } = useStyles();
  const { classes: inputStyles } = useInputStyles({
    leftAlign,
    centerAlign,
  });

  return (
    <MuiTextField
      className={cx(classes.root, className)}
      variant="standard"
      InputProps={{
        classes: inputStyles,
        disableUnderline: true,
      }}
      {...textFieldProps}
    />
  );
};

export default LargeTextField;
