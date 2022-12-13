import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import DesktopNav from "./desktop_header"
import MobileNav from "./mobile_header"

export default function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const isHomepage = !window.location.pathname.startsWith("/prealpha");

  return matches ? (
    <DesktopNav isHomepage={isHomepage} />
  ) : (
    <MobileNav isHomepage={isHomepage} />
  );
}
