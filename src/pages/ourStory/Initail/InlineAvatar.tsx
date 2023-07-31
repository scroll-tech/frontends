import { makeStyles } from "tss-react/mui"

import { Avatar, Box } from "@mui/material"

const useStyles = makeStyles<any>()((theme, { fontSize }) => ({
  placeholder: {
    position: "relative",
    height: fontSize,
    width: "5rem",
    display: "inline-block",
    verticalAlign: "middle",
  },
  avatar: {
    position: "absolute",
    width: "5rem",
    height: "5rem",
    backgroundColor: "#FFDEB5",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  img: {
    position: "relative",
    top: "4px",
    height: "auto",
  },
}))

const InlineAvater = props => {
  const { fontSize, ...restProps } = props
  const { classes } = useStyles({ fontSize })
  return (
    <Box className={classes.placeholder}>
      <Avatar classes={{ root: classes.avatar, img: classes.img }} {...restProps}></Avatar>
    </Box>
  )
}

export default InlineAvater
