import { sendGAEvent } from "@next/third-parties/google"

import { ListItemButton } from "@mui/material"

import ExternalLinkSvg from "@/assets/svgs/common/external-link.svg"
import Link from "@/components/Link"

const MenuItem = props => {
  const { mode, children, label, href, reloadDocument, isActive, dark, sx } = props
  const isExternal = mode === "desktop" && href?.startsWith("http")

  const handleTrackEvent = () => {
    sendGAEvent("event", "click_menu", {
      label,
      device: mode,
    })
  }

  return (
    <Link href={href} target={isExternal ? "_blank" : "_self"} reloadDocument={reloadDocument}>
      <ListItemButton
        className="group"
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "1.6rem",
          lineHeight: "2.4rem",
          minWidth: "13.6rem",
          fontWeight: 400,
          color: isActive ? "primary.main" : dark ? "primary.contrastText" : "text.primary",
          "&:hover": {
            bgcolor: "transparent",
            color: "primary.main",
          },
          ...sx,
        }}
        onClick={handleTrackEvent}
      >
        {children}
        {isExternal && (
          <span className="invisible relative -translate-x-2 transition-transform group-hover:visible group-hover:translate-x-0">
            <ExternalLinkSvg className="w-[1rem] h-auto"></ExternalLinkSvg>
          </span>
        )}
      </ListItemButton>
    </Link>
  )
}

export default MenuItem
