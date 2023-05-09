import { useRef } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Chip } from "@mui/material"

import { DIVERGENT_CATEGORY_MAP } from "@/constants"

const useStyles = makeStyles()(theme => ({
  wrapper: {
    justifyContent: "center",
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% + 6rem)",
      marginTop: "2rem",
      marginLeft: "-3rem",
      padding: "0 1.6rem",
      overflow: "auto",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  clickable: {
    padding: "1rem 2.6rem",
    borderColor: theme.palette.text.secondary,
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(217, 217, 217, 0.26)",
    fontWeight: 400,
    cursor: "pointer",
    "&:hover": {
      borderColor: "#FA8100",
      color: "#FA8100",
      backgroundColor: "rgba(250, 129, 0, 0.1) !important",
    },
  },
  label: {
    padding: 0,
    fontSize: "1.6rem",
    lineHeight: 1.1875,
  },
  selected: {
    borderColor: "#FA8100",
    color: "#FA8100",
    fontWeight: 500,
    backgroundColor: "rgba(250, 129, 0, 0.1)",
    pointerEvents: "none",
  },
}))

const Filter = props => {
  const { value, onChange } = props

  const { classes, cx } = useStyles()

  const allCategories = useRef(["All", ...Object.keys(DIVERGENT_CATEGORY_MAP)])

  const handleSelectCategory = value => {
    onChange(value)
  }
  return (
    <Box className={classes.wrapper}>
      {allCategories.current.map(item => (
        <Chip
          classes={classes}
          variant="outlined"
          className={cx(value === item && classes.selected)}
          key={item}
          label={item}
          clickable
          onClick={() => handleSelectCategory(item)}
        ></Chip>
      ))}
    </Box>
  )
}

export default Filter
