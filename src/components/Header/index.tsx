import React from "react";
import { Link, Button } from "@mui/material";
import { styled, Stack } from "@mui/system";
import MobileNav from "./mobile_header";
import DesktopNav from "./desktop_header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return matches ? <DesktopNav /> : <MobileNav />;
}
