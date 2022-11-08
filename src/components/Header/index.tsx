import MobileNav from "./mobile_header";
import DesktopNav from "./desktop_header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AppType } from "@/constants";

export default function Header() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const isHomepage = process.env.REACT_APP_BUILD_TARGET === AppType.HOMEPAGE;

  return matches ? (
    <DesktopNav isHomepage={isHomepage} />
  ) : (
    <MobileNav isHomepage={isHomepage} />
  );
}
