import { Stack, Typography } from "@mui/material"

import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

import BadgeImage from "../../components/BadgeImage"

const PerkItem = props => {
  const { perk, onClick } = props
  const { title, description, claimed, imageURL } = perk

  const { isMobile } = useCheckViewport()

  return (
    <Stack
      textAlign="center"
      gap="1.6rem"
      sx={{
        background: "rgba(255, 255, 255, 0.10)",
        borderRadius: "2rem",
        cursor: "pointer",
        position: "relative",
        alignItems: "center",
        p: ["2.4rem 1.6rem", "2.4rem"],
        "*:hover": {
          cursor: "inherit",
        },
      }}
      role="button"
      onClick={onClick}
    >
      {claimed && (
        <Typography
          sx={{
            fontSize: ["1.2rem"],
            lineHeight: "1.6rem",
            fontWeight: 600,
            color: "#90F8EA",
            padding: "0.4rem 0.8rem",
            background: "rgba(144, 248, 234, 0.20)",
            borderRadius: "1.2rem",
            position: "absolute",
            right: "0.8rem",
            top: "0.8rem",
          }}
        >
          Claimed
        </Typography>
      )}
      <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.4rem", "4rem"], fontWeight: 600, color: "primary.contrastText" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], color: "primary.contrastText" }}>{description}</Typography>
      <Stack direction="row" gap="1.6rem" justifyContent="center">
        {imageURL.map((url, index) => (
          <BadgeImage
            src={url}
            alt={`required-badge-${index}`}
            placeholder={BadgePlaceholderSvg}
            width={isMobile ? "48px" : "64px"}
            height={isMobile ? "48px" : "64px"}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default PerkItem
