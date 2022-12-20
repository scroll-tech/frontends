import { makeStyles } from "tss-react/mui"
import { ButtonProps } from "@mui/material/Button"
import { SvgIcon, Typography } from "@mui/material"

const useStyles = makeStyles()(() => {
  return {
    button: {
      appearance: "none",
      border: 0,
      outline: 0,
      padding: 0,
      margin: 0,
      background: "none",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        cursor: "pointer",
      },
    },
    label: {
      marginLeft: "0.5em",
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#333",
      cursor: "pointer",
    },
  }
})

export type Props = ButtonProps & {
  label: string
  icon: any
  viewBox: string
}

const MiniButton = (props: Props) => {
  const { icon, viewBox, label, className, ...restProps } = props
  const { classes, cx } = useStyles()

  return (
    <button className={cx(classes.button, className)} {...restProps}>
      <SvgIcon style={{ fontSize: "1.8rem" }} viewBox={viewBox} component={icon}></SvgIcon>
      <Typography className={classes.label}>{label}</Typography>
    </button>
  )
}

export default MiniButton
