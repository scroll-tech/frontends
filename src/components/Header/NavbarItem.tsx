import clsx from "clsx"

import { Box, Typography } from "@mui/material"

import TriangleDownSvg from "@/assets/svgs/common/header-triangle-down.svg"

const NavbarItem = props => {
  const { children, dark, isActive, isHovering, isNew, expendMore = true, ...restProps } = props
  return (
    <Box
      className={clsx(isActive && "active")}
      sx={{
        fontSize: "1.8rem",
        lineHeight: "6.5rem",
        fontWeight: 400,
        position: "relative",
        color: dark ? "primary.contrastText" : "text.primary",
        whiteSpace: "nowrap",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          // WebkitTextStroke: "0.2px var(--mui-palette-primary-main)",
          fontWeight: 500,
          color: "primary.main",
        },
        "&.active": {
          // WebkitTextStroke: "0.4px var(--mui-palette-primary-main)",
          fontWeight: 600,
          color: "primary.main",
        },
      }}
      {...restProps}
    >
      {children}
      {isNew && (
        <Box sx={{ backgroundColor: "#B5F5EC", padding: "0 0.8rem", height: "2rem", lineHeight: "2rem", borderRadius: "0.4rem", ml: "1rem" }}>
          <Typography sx={{ fontSize: "1.2rem", lineHeight: "2rem", fontWeight: 600 }}>NEW</Typography>
        </Box>
      )}
      {expendMore && (
        <TriangleDownSvg
          className={clsx("w-[9px] ml-[1rem] will-change-transform transition-transform", isHovering && "rotate-180")}
        ></TriangleDownSvg>
      )}
    </Box>
  )
}

export default NavbarItem
