import { useRef } from "react"
import { makeStyles } from "tss-react/mui"

import { MenuItem, MenuList, Typography } from "@mui/material"

import { DIVERGENT_CATEGORY_MAP } from "@/constants"

const useStyles = makeStyles()(theme => ({
  menuListRoot: {
    padding: 0,
    gridRow: "span 2",

    [theme.breakpoints.down("md")]: {
      gridRow: "span 1",
      gridColumn: "1 / 3",
      paddingBottom: "1.2rem",
      display: "flex",
      width: "100%",
      overflowX: "auto",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(209, 205, 204, 0.30)",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar": {
        width: "4px",
        height: "4px",
      },
      // Firefox
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",
    },
  },
  menuItemRoot: {
    padding: "0.8rem 2.4rem",
    minHeight: "unset",
    [theme.breakpoints.down("sm")]: {
      padding: "0.8rem",
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.text.primary,
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: theme.palette.text.primary,
      },
      ".MuiTypography-root": {
        color: theme.palette.primary.contrastText,
      },
    },
    "&:nth-child(n + 2)": {
      marginTop: "1.6rem",
      [theme.breakpoints.down("md")]: {
        marginTop: 0,
        marginLeft: "0.8rem",
      },
    },
  },
}))

const Category = props => {
  const { value, onChange } = props
  const { classes } = useStyles()
  const allCategories = useRef(["All categories", ...Object.keys(DIVERGENT_CATEGORY_MAP)])

  return (
    <MenuList classes={{ root: classes.menuListRoot }}>
      {allCategories.current.map(item => (
        <MenuItem classes={{ root: classes.menuItemRoot }} selected={value === item} onClick={() => onChange(item)}>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600, cursor: "inherit" }}>{item}</Typography>
        </MenuItem>
      ))}
    </MenuList>
  )
}
export default Category
