import { ExpandMore } from "@mui/icons-material"
import { Box, ListItemButton, Stack, Typography } from "@mui/material"

const MobileNavbarItem = props => {
  const { dark, isNew, isActive, expendMore = true, label, children, ...restProps } = props
  return (
    <ListItemButton
      className="navbar-item"
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
      }}
      {...restProps}
    >
      <Stack direction="row" alignItems="center" spacing="0.8rem">
        <span>{label}</span>
        {isNew && (
          <Box
            sx={{
              backgroundColor: "#B5F5EC",
              padding: "0 0.8rem",
              height: "2rem",
              lineHeight: "2rem",
              borderRadius: "0.4rem",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", lineHeight: "2rem", fontWeight: 600 }}>NEW</Typography>
          </Box>
        )}
      </Stack>
      {expendMore && (
        <ExpandMore
          fontSize="large"
          className={isActive ? "active" : ""}
          sx={{
            transition: "transform 0.3s ease",
            "&.active": {
              transform: "rotate(180deg)",
            },
          }}
        />
      )}
    </ListItemButton>
  )
}

export default MobileNavbarItem
