import { makeStyles } from "tss-react/mui"

import { Avatar, Box } from "@mui/material"

const useStyles = makeStyles<any>()((theme, { size }) => ({
  placeholder: {
    position: "relative",
    height: size === "small" ? "2.6rem" : "3.2rem",
    width: size === "small" ? "4rem" : "5rem",
    display: "inline-block",
    verticalAlign: "middle",
  },
  avatar: {
    position: "absolute",
    width: size === "small" ? "4rem" : "5rem",
    height: size === "small" ? "4rem" : "5rem",
    backgroundColor: theme.palette.themeBackground.highlight,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}))

const InlineAvater = props => {
  const { fontSize, size = "middle", ...restProps } = props
  const { classes } = useStyles({ size })
  return (
    <Box component="span" className={classes.placeholder}>
      <Avatar classes={{ root: classes.avatar }} {...restProps} component="span"></Avatar>
    </Box>
  )
}

export default InlineAvater
