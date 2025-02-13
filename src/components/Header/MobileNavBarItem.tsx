import { ListItemButton } from "@mui/material"

const MobileNavbarItem = props => {
  const { dark, children, ...restProps } = props
  return (
    <ListItemButton
      sx={{
        fontSize: "1.8rem",
        fontWeight: 600,
        height: "7.2rem",
        lineHeight: "7.2rem",
        p: 0,
        color: dark ? "primary.contrastText" : "text.primary",
        display: "flex",
        justifyContent: "space-between",
        "&.active": {},
        "&:hover": {
          background: "transparent",
        },
        "&:nth-of-type(n+2)": {
          borderTop: theme => `1px solid ${dark ? theme.vars.palette.primary.contrastText : theme.vars.palette.text.primary}`,
        },
      }}
      {...restProps}
    >
      {children}
    </ListItemButton>
  )
}

export default MobileNavbarItem
