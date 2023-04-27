import { useRef } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Chip } from "@mui/material"

import { DIVERGENT_CATEGORY_MAP } from "@/constants"

const useStyles = makeStyles()(theme => ({
  clickable: {
    padding: "1rem 3.2rem",
    borderRadius: "0.9rem",
    color: "#FF7700",
    backgroundColor: "#FFE3CA",
    fontFamily: "Inter",
    fontWeight: 500,

    "&:hover": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },

    [theme.breakpoints.down("lg")]: {
      padding: "1rem 2.8rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0.6rem 2.6rem",
    },
  },
  label: {
    padding: 0,
    fontSize: "2rem",
    lineHeight: 1.2,
    textTransform: "uppercase",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  selected: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
}))

const Filter = props => {
  const { value, onChange } = props

  const { classes, cx } = useStyles()

  const allCategories = useRef(["all", ...Object.keys(DIVERGENT_CATEGORY_MAP)])

  const handleSelectCategory = value => {
    onChange(value)
  }
  return (
    <Box sx={{ marginTop: ["2.8rem", "5rem"], display: "flex", flexWrap: "wrap", gap: ["1.5rem", "2rem"] }}>
      {allCategories.current.map(item => (
        <Chip
          classes={classes}
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
